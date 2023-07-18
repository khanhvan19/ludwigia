import { useState } from 'react';
import mammoth from 'mammoth';

var keyWord = ['Tên khoa học', 'Tên khác', 'Tên tiếng Việt'];
var indexKeyWord = [];
function Dashboard() {
    const [pdfContent, setPdfContent] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = function () {
            mammoth
                .extractRawText({ arrayBuffer: this.result })
                .then(function (result) {
                    result.value.split('\n').filter((e) => e.trim() !== '' && e.trim() !== '\t').forEach((element, index) => {
                        keyWord.forEach((e) => {
                            if (element.includes(e)) {
                                indexKeyWord.push(index);
                            }
                        });
                    });
                    console.log(indexKeyWord);
                    console.log(result.value.split('\n').filter((e) => e.trim() != ''));
                    setPdfContent(result.value);
                })
                .done();
        };
        fileReader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <div>{pdfContent}</div>
        </div>
    );
}

export default Dashboard;
