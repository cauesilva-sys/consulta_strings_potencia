import zipfile
import os

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
public_dir = os.path.join(base_dir, 'public')
os.makedirs(public_dir, exist_ok=True)
zip_path = os.path.join(public_dir, 'projeto-gdsun-strings.zip')

include_dirs = ['src', 'api']
include_files = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'vercel.json',
    'index.html',
    'README.md',
    '.gitignore',
    '.env.example'
]

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for f in include_files:
        full_path = os.path.join(base_dir, f)
        if os.path.exists(full_path):
            zipf.write(full_path, f)
    for d in include_dirs:
        full_d = os.path.join(base_dir, d)
        if os.path.exists(full_d):
            for root, _, files in os.walk(full_d):
                for file in files:
                    full_p = os.path.join(root, file)
                    rel_p = os.path.relpath(full_p, base_dir)
                    zipf.write(full_p, rel_p)

print(f'Archive created: {zip_path} ({os.path.getsize(zip_path)} bytes)')
