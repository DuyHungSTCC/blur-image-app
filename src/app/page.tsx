'use client';
import React, { useState } from 'react';

export default function Page() {
  const [image, setImage] = useState(null);
  const [blurredImage, setBlurredImage] = useState(null);
  const [kernelSize, setKernelSize] = useState(3);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setBlurredImage(null); // reset when new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = () => {
    if (!image || kernelSize < 1) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.filter = `blur(${kernelSize}px)`;
      ctx.drawImage(img, 0, 0);
      setBlurredImage(canvas.toDataURL());
    };
  };

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h2>Ứng dụng làm mờ ảnh</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div style={{ marginTop: 10 }}>
        <label>Chọn độ mờ (px): </label>
        <input
          type="range"
          min="1"
          max="20"
          value={kernelSize}
          onChange={(e) => setKernelSize(Number(e.target.value))}
        />
        <span> {kernelSize}px</span>
      </div>
      <button style={{ marginTop: 10 }} onClick={handleBlur}>Xử lý</button>
      {image && (
        <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
          <div style={{ flex: 1 }}>
            <h4>Ảnh gốc:</h4>
            <img src={image} alt="Original" style={{ width: '100%' }} />
          </div>
          {blurredImage && (
            <div style={{ flex: 1 }}>
              <h4>Ảnh sau khi làm mờ:</h4>
              <img src={blurredImage} alt="Blurred" style={{ width: '100%' }} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
