const allowedExtensions = ['txt', 'sql'];

function run() {
    document.getElementById('inputFile').addEventListener('change', function(){
        document.getElementById('copied').classList.add('hide');
        const comment = '-'.repeat(10);
        const output = document.getElementById('outputFile');
        const fileNames = document.getElementById('fileNames');
        output.value = '';
        fileNames.textContent = '';
        
        for (const file of this.files) {
            if (allowedExtensions.includes(file.name.split('.').pop()))
            {
                readFile(file).then(result => {
                    output.value += comment.concat(file.name, comment, '\n');
                    output.value += result.concat('\n\n\n');
                    fileNames.textContent += file.name.concat('\n');
                });
            }
        }
    });
}

function readFile(file) {
    return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            resolve(fileReader.result.concat('\n\n\n'));
        };
        fileReader.readAsText(file);
    });
}

function copyToClipboard() {
    const selection = document.getElementById('outputFile');
    selection.select();
    document.execCommand('copy');
    document.getElementById('copied').classList.remove('hide');
}

function reset() {
    document.getElementById('inputFile').value = '';
    document.getElementById('outputFile').value = '';
    document.getElementById('fileNames').textContent = '';
    document.getElementById('copied').classList.add('hide');
}