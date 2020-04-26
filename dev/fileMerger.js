const allowedExtensions = ['txt', 'sql'];

function run() {
    document.getElementById('inputFile').addEventListener('change', function(){
        document.getElementById('copied').classList.add('hide');
        const comment = '-'.repeat(10);
        const output = document.getElementById('outputFile');
        const fileNames = document.getElementById('fileNames');
        output.value = '';
        fileNames.textContent = '';

        let filePromises = Array.from(this.files).map(file => readFile(file));
        Promise.all(filePromises)
            .then(responses => {
                responses.forEach(response => {
                    output.value += comment.concat(response.name, comment, '\n');
                    output.value += response.text.concat('\n\n\n');
                    fileNames.textContent += response.name.concat('\n');
                });
            });
    });
}

function readFile(file) {
    return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const fileData = {name: file.name, text: fileReader.result.concat('\n\n\n')};
            resolve(fileData);
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