var dropzoneOverlay = document.querySelector('.dropzone-overlay');

function getDataTransferFiles(event) {
    var dataTransferItemsList = [];
    if (event.dataTransfer) {
        var dt = event.dataTransfer;
        if (dt.files && dt.files.length) {
            dataTransferItemsList = dt.files;
        } else if (dt.items && dt.items.length) {
            // During the drag even the dataTransfer.files is null
            // but Chrome implements some drag store, which is accesible via dataTransfer.items
            dataTransferItemsList = dt.items;
        }
    } else if (event.target && event.target.files) {
        dataTransferItemsList = event.target.files;
    }

    if (dataTransferItemsList.length > 0) {
        dataTransferItemsList = [dataTransferItemsList[0]];
    }

    // Convert from DataTransferItemsList to the native Array
    return Array.prototype.slice.call(dataTransferItemsList);
}


function showDragFocus() {
    dropzoneOverlay.className = 'dropzone-overlay active';
}

function hideDragFocus() {
    dropzoneOverlay.className = 'dropzone-overlay';
}

function onFileDragEnter(ev) {
    ev.preventDefault();

    showDragFocus();
}

function onFileDragOver(ev) {
    ev.preventDefault();
}

function onFileDrop(ev) {
    ev.preventDefault();

    hideDragFocus();

    var fileList = getDataTransferFiles(ev);

    updateStickerImage(fileList[0]);

    return null;
}

function onFileDragLeave(ev) {
    ev.preventDefault();

    console.log(ev.target)

    if (ev.target !== document.body) {
        return;
    }

    hideDragFocus();
}

function drawImage(canvas, imageBitmap) {
    var ctx = canvas.getContext('2d');
    ctx.drawImage(file, 0, 0);
}

function updateStickerImage(file) {
    var reader = new FileReader();
    reader.onload = function(ev) {
        var dataURL = ev.target.result;
        document.querySelectorAll('.sticker').forEach(function(img) {
            img.style = 'background-image: url(' + dataURL + ')';
        });
    }
    reader.readAsDataURL(file);
}

document.body.ondragenter = onFileDragEnter;
document.body.ondragover = onFileDragOver;
document.body.ondragleave = onFileDragLeave;
document.body.ondrop = onFileDrop;