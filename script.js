// Canvas 초기화
const canvas = new fabric.Canvas('canvas', {
    width: 800,
    height: 600
});

// 이미지 업로드 처리
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(f) {
        fabric.Image.fromURL(f.target.result, function(img) {
            // 이미지 크기 조정
            const scale = Math.min(
                canvas.width / img.width,
                canvas.height / img.height
            );
            img.scale(scale);
            
            // 캔버스 중앙에 배치
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
        });
    };
    reader.readAsDataURL(file);
});

// 밝기 조절
let brightness = 1;
document.getElementById('brightnessUp').addEventListener('click', function() {
    brightness += 0.1;
    applyFilter();
});

document.getElementById('brightnessDown').addEventListener('click', function() {
    brightness -= 0.1;
    applyFilter();
});

function applyFilter() {
    canvas.getActiveObject().filters = [
        new fabric.Image.filters.Brightness({ brightness: brightness })
    ];
    canvas.getActiveObject().applyFilters();
    canvas.renderAll();
}

// 회전 기능
document.getElementById('rotateLeft').addEventListener('click', function() {
    const obj = canvas.getActiveObject();
    if (obj) {
        obj.rotate(obj.angle - 90);
        canvas.renderAll();
    }
});

document.getElementById('rotateRight').addEventListener('click', function() {
    const obj = canvas.getActiveObject();
    if (obj) {
        obj.rotate(obj.angle + 90);
        canvas.renderAll();
    }
});

// 텍스트 추가
document.getElementById('addText').addEventListener('click', function() {
    const text = new fabric.IText('텍스트를 입력하세요', {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fill: '#000000',
        fontSize: 20
    });
    canvas.add(text);
    canvas.setActiveObject(text);
});

// 이미지 저장
document.getElementById('download').addEventListener('click', function() {
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
    });
    
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});