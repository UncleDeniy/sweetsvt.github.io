// graph.js — простой интерактивный граф тегов (без библиотек)
(function() {
    'use strict';

    const normalize = (t) => (t || '').toString().toLowerCase().replace(/ё/g, 'е').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

    function loadResources() {
        const out = [];
        try { if (window.itResources) out.push(...window.itResources); } catch {}
        try { if (window.customizationResources) out.push(...window.customizationResources); } catch {}
        try {
            if (window.lections && Array.isArray(window.lections)) {
                out.push(...window.lections.map(l => ({
                    id: `lecture-${l.id}`,
                    tags: Array.isArray(l.tags) ? l.tags : [],
                    category: l.category || '',
                })));
            }
        } catch {}
        return out;
    }

    function buildGraph(resources) {
        // nodes = tags, edges = co-occurrence in same resource
        const tagCount = new Map();
        const edgeCount = new Map(); // key "a|b"
        for (const r of resources) {
            const tags = (Array.isArray(r.tags) ? r.tags : []).map(t => normalize(t)).filter(Boolean);
            const uniqTags = Array.from(new Set(tags)).slice(0, 20);
            uniqTags.forEach(t => tagCount.set(t, (tagCount.get(t) || 0) + 1));
            for (let i = 0; i < uniqTags.length; i++) {
                for (let j = i + 1; j < uniqTags.length; j++) {
                    const a = uniqTags[i],
                        b = uniqTags[j];
                    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
                    edgeCount.set(key, (edgeCount.get(key) || 0) + 1);
                }
            }
        }

        const nodes = Array.from(tagCount.entries())
            .filter(([, c]) => c >= 2)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 140)
            .map(([id, count]) => ({ id, count }));

        const nodeIndex = new Map(nodes.map((n, i) => [n.id, i]));

        const links = [];
        for (const [key, w] of edgeCount.entries()) {
            const [a, b] = key.split('|');
            if (!nodeIndex.has(a) || !nodeIndex.has(b)) continue;
            if (w < 2) continue;
            links.push({ a, b, w });
        }
        return { nodes, links };
    }

    function simulate(nodes, links) {
        nodes.forEach((n) => {
            n.x = Math.random() * W;
            n.y = Math.random() * H;
            n.vx = 0;
            n.vy = 0;
            n.r = 6 + Math.min(14, Math.log2(n.count + 1) * 4);
        });

        const idToNode = new Map(nodes.map((n) => [n.id, n]));

        // ТЮНИНГ (спокойнее)
        let alpha = 1.0; // “энергия” системы
        const ALPHA_DECAY = 0.985; // чем ближе к 1 — тем дольше успокаивается
        const REPULSE = 900; // было слишком
        const LINK_K = 0.004; // сила пружин
        const CENTER_K = 0.0008; // притяжение к центру
        const DAMP = 0.72; // сильнее гасим скорость
        const PAD = 18;
        const MAX_V = 6; // ограничение скорости (самое важное)

        function clampV(n) {
            const v2 = n.vx * n.vx + n.vy * n.vy;
            const max2 = MAX_V * MAX_V;
            if (v2 > max2) {
                const k = MAX_V / Math.sqrt(v2);
                n.vx *= k;
                n.vy *= k;
            }
        }

        function step() {
            const centerX = W / 2;
            const centerY = H / 2;

            // “остываем”
            alpha *= ALPHA_DECAY;
            if (alpha < 0.03) alpha = 0.03;

            // repulsion + collision
            for (let i = 0; i < nodes.length; i++) {
                const ni = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const nj = nodes[j];

                    let dx = ni.x - nj.x;
                    let dy = ni.y - nj.y;
                    let d2 = dx * dx + dy * dy + 0.01;
                    const dist = Math.sqrt(d2);

                    const ux = dx / dist;
                    const uy = dy / dist;

                    // отталкивание (умножаем на alpha)
                    const force = (REPULSE * alpha) / d2;
                    ni.vx += ux * force;
                    ni.vy += uy * force;
                    nj.vx -= ux * force;
                    nj.vy -= uy * force;

                    // коллизия (мягче)
                    const minDist = ni.r + nj.r + 10;
                    if (dist < minDist) {
                        const push = (minDist - dist) * 0.05;
                        ni.vx += ux * push;
                        ni.vy += uy * push;
                        nj.vx -= ux * push;
                        nj.vy -= uy * push;
                    }
                }
            }

            // links attraction (spring)
            for (const l of links) {
                const a = idToNode.get(l.a);
                const b = idToNode.get(l.b);
                if (!a || !b) continue;

                let dx = b.x - a.x;
                let dy = b.y - a.y;
                const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;

                const target = 140 - Math.min(80, l.w * 8);
                const k = LINK_K + Math.min(0.004, l.w * 0.0006);

                const f = (dist - target) * k * alpha;

                dx /= dist;
                dy /= dist;

                a.vx += dx * f;
                a.vy += dy * f;
                b.vx -= dx * f;
                b.vy -= dy * f;
            }

            // pull to center
            for (const n of nodes) {
                n.vx += (centerX - n.x) * CENTER_K * alpha;
                n.vy += (centerY - n.y) * CENTER_K * alpha;
            }

            // integrate + bounds + clamp speed
            for (const n of nodes) {
                n.vx *= DAMP;
                n.vy *= DAMP;

                clampV(n);

                n.x += n.vx;
                n.y += n.vy;

                n.x = Math.max(PAD, Math.min(W - PAD, n.x));
                n.y = Math.max(PAD, Math.min(H - PAD, n.y));
            }
        }

        function kick() {
            // после resize — маленький “пинок”, но тоже безопасный
            for (const n of nodes) {
                n.vx *= 0.4;
                n.vy *= 0.4;
            }
            alpha = Math.min(1.0, alpha + 0.25);
        }

        return { step, kick };
    }



    // Rendering & interactions (pan/zoom/drag)
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const wrap = document.getElementById('graphWrap');

    let W = 0,
        H = 0; // размеры в CSS-пикселях
    let dpr = 1;

    function resizeCanvas() {
        const r = (wrap || canvas).getBoundingClientRect();
        W = Math.max(320, Math.floor(r.width));
        H = Math.max(320, Math.floor(r.height));

        dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

        canvas.width = Math.floor(W * dpr);
        canvas.height = Math.floor(H * dpr);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';



    }

    // стартовый размер
    resizeCanvas();
    window.addEventListener('resize', () => {
        clearTimeout(window.__gRz);
        window.__gRz = setTimeout(() => {
            resizeCanvas();
            // чуть “подтолкнуть” симуляцию после resize
            if (sim && typeof sim.kick === 'function') sim.kick();
        }, 120);
    });


    let zoom = 1,
        panX = 0,
        panY = 0;
    let dragNode = null,
        dragging = false;
    let lastX = 0,
        lastY = 0;
    let hovering = null;

    let panMode = false;
    let panStartX = 0,
        panStartY = 0;
    let panStartPX = 0,
        panStartPY = 0;


    function toWorld(x, y) {
        return { x: (x - panX) / zoom, y: (y - panY) / zoom };
    }

    function draw(nodes, links, query) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        ctx.save();
        ctx.translate(panX, panY);
        ctx.scale(zoom, zoom);


        const q = normalize(query);
        const highlight = q ? new Set(q.split(/\s+/).filter(Boolean)) : null;

        // links
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 1;
        for (const l of links) {
            const a = nodesById.get(l.a),
                b = nodesById.get(l.b);
            if (!a || !b) continue;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(148,163,184,0.35)';
            ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // nodes
        for (const n of nodes) {
            const isHi = highlight && highlight.has(n.id);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = isHi ? 'rgba(99,102,241,0.85)' : 'rgba(51,65,85,0.85)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(148,163,184,0.6)';
            ctx.stroke();

            // label
            ctx.font = `${Math.max(11, Math.min(16, n.r))}px system-ui`;
            ctx.fillStyle = 'rgba(226,232,240,0.92)';
            ctx.fillText(n.id, n.x + n.r + 4, n.y + 4);
        }

        ctx.restore();

        // tooltip
        if (hovering) {
            const text = `#${hovering.id} · ${hovering.count}`;
            ctx.save();
            ctx.font = '13px system-ui';
            const w = ctx.measureText(text).width + 16;
            const x = lastX + 12,
                y = lastY + 12;
            ctx.fillStyle = 'rgba(15,23,42,0.92)';
            ctx.strokeStyle = 'rgba(148,163,184,0.55)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(x, y, w, 28, 10);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = 'rgba(226,232,240,0.95)';
            ctx.fillText(text, x + 8, y + 18);
            ctx.restore();
        }
    }

    // polyfill roundRect
    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
            r = Math.min(r, w / 2, h / 2);
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
        };
    }

    let nodes = [],
        links = [],
        nodesById = new Map(),
        sim = null;

    function pickNode(mx, my) {
        const p = toWorld(mx, my);
        for (let i = nodes.length - 1; i >= 0; i--) {
            const n = nodes[i];
            const dx = p.x - n.x,
                dy = p.y - n.y;
            if (dx * dx + dy * dy <= (n.r + 4) * (n.r + 4)) return n;
        }
        return null;
    }

    function init() {
        const res = loadResources();
        const g = buildGraph(res);
        nodes = g.nodes;
        links = g.links;
        nodesById = new Map(nodes.map(n => [n.id, n]));
        sim = simulate(nodes, links);

        // interactions
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
            hovering = pickNode(lastX, lastY);
            if (dragging && panMode && !dragNode) {
                panX = panStartPX + (lastX - panStartX);
                panY = panStartPY + (lastY - panStartY);
            }

            canvas.style.cursor = dragging ? 'grabbing' : (hovering ? 'pointer' : 'default');
            if (dragNode) {
                const p = toWorld(lastX, lastY);
                dragNode.x = p.x;
                dragNode.y = p.y;
                dragNode.vx = 0;
                dragNode.vy = 0;
            }
        });

        canvas.addEventListener('mousedown', (e) => {
            dragging = true;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            lastX = mx;
            lastY = my;

            dragNode = pickNode(mx, my);

            if (dragNode) {
                panMode = false;
            } else {
                panMode = true;
                panStartX = mx;
                panStartY = my;
                panStartPX = panX;
                panStartPY = panY;
            }

            canvas.style.cursor = 'grabbing';
        });

        window.addEventListener('mouseup', () => {
            dragging = false;
            dragNode = null;
            panMode = false;
            canvas.style.cursor = 'default';
        });


        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();

            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            // world point under cursor BEFORE zoom
            const wx = (mx - panX) / zoom;
            const wy = (my - panY) / zoom;

            const factor = (e.deltaY > 0) ? 0.9 : 1.1;
            zoom = Math.max(0.45, Math.min(2.6, zoom * factor));

            // keep same world point under cursor AFTER zoom
            panX = mx - wx * zoom;
            panY = my - wy * zoom;
        }, { passive: false });


        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left,
                my = e.clientY - rect.top;
            const n = pickNode(mx, my);
            if (!n) return;
            location.href = `search.html?q=${encodeURIComponent(n.id)}`;
        });

        // Loop
        const queryInput = document.getElementById('graphQuery');

        function loop() {
            sim.step();
            draw(nodes, links, queryInput ? queryInput.value : '');
            requestAnimationFrame(loop);
        }
        loop();

        if (queryInput) {
            queryInput.addEventListener('input', () => {
                // render loop reads it
            });
        }




    }

    document.addEventListener('DOMContentLoaded', init);
})();