import os
from PIL import Image

def crop_and_compress():
    # Calculate path relative to the script location
    current_dir = os.path.dirname(os.path.abspath(__file__))
    members_dir = os.path.abspath(os.path.join(current_dir, "..", "assets", "members"))
    members = ["taiki", "adrian", "julyet", "neo", "shasenem", "hugo", "vanessa", "daichi"]
    
    print(f"Scanning members directory: {members_dir}")
    for m in members:
        # Check standard filename
        filename = f"{m}.jpg"
        filepath = os.path.join(members_dir, filename)
        
        if not os.path.exists(filepath):
            # Check if it exists as PNG
            alt_path = os.path.join(members_dir, f"{m}.png")
            if os.path.exists(alt_path):
                filepath = alt_path
            else:
                # Check other cases just in case
                print(f"Skipping {m}: file not found")
                continue
        
        try:
            with Image.open(filepath) as img:
                # Convert palette images/RGBA to RGB
                if img.mode != "RGB":
                    img = img.convert("RGB")
                
                # Central square crop
                width, height = img.size
                min_dim = min(width, height)
                
                left = (width - min_dim) // 2
                top = (height - min_dim) // 2
                right = left + min_dim
                bottom = top + min_dim
                
                img_cropped = img.crop((left, top, right, bottom))
                
                # Resize to 512x512
                target_size = (512, 512)
                img_resized = img_cropped.resize(target_size, Image.Resampling.LANCZOS)
                
                # Save as JPG in assets/members/
                out_path = os.path.join(members_dir, f"{m}.jpg")
                img_resized.save(out_path, "JPEG", quality=80)
                
                # If the original file was not the target JPG path (e.g. it was .png), remove it
                if filepath != out_path:
                    os.remove(filepath)
                    
                print(f"Processed {m}: {img_resized.size} saved to {out_path} ({os.path.getsize(out_path) // 1024} KB)")
        except Exception as e:
            print(f"Error processing {m}: {e}")

if __name__ == "__main__":
    crop_and_compress()
