# glados_tts.py
import os
import tempfile
import re
from TeraTTS import TTS
from ruaccent import RUAccent
from transliterate import translit

class GladosTTS:
    def __init__(self, config):
        self.config = config
        self.setup_tts()
        
    def setup_tts(self):
        try:
            self.accentizer = RUAccent()
            custom_dict = {
                'ГЛаДОС': 'ГЛ+А+ДОС', 
                'ГЛАДОС': 'ГЛ+АДОС', 
                'ГлаДОС': 'Гл+аДОС',
                'ИИ': '+И-+И',
                'АИ': '+А-+И'
            }
            self.accentizer.load(omograph_model_size='turbo', use_dictionary=True, custom_dict=custom_dict)
            self.tts = TTS(self.config['tts']['model'], 
                          add_time_to_end=1.0, 
                          tokenizer_load_dict=True)
            print("✅ TTS система инициализирована")
        except Exception as e:
            print(f"❌ Ошибка инициализации TTS: {e}")
            self.tts = None

    def text_to_speech(self, text):
        if not self.tts:
            print("❌ TTS не доступен")
            return None
            
        try:
            processed_text = translit(text, 'ru')
            
            custom_dict = {
                'ГЛаДОС': 'ГЛ+А+ДОС', 
                'ГЛАДОС': 'ГЛ+АДОС', 
                'ГлаДОС': 'Гл+аДОС',
                'ИИ': '+И-+И',
                'АИ': '+А-+И'
            }
            for k, v in custom_dict.items():
                processed_text = processed_text.replace(k, v)
            
            processed_text = self.accentizer.process_all(processed_text.strip())
            
            # Создаем временный файл для аудио
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmpfile:
                self.tts(processed_text, play=False, lenght_scale=self.config['tts']['length_scale'], audio_out=tmpfile.name)
                return tmpfile.name
                
        except Exception as e:
            print(f"❌ Ошибка TTS: {e}")
            return None
