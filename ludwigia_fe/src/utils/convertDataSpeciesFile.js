const keyWord = [
    'Tên khoa học',
    'Tên khác',
    'Tên tiếng Việt',
    'Họ',
    'Takhtajan',
    'Mô tả',
    'Vi phẫu',
    'Phân bố và sinh thái',
    'Hóa thực vật và hoạt tính sinh học',
    'Bộ phận dùng và công dụng',
    'Tài liệu tham khảo'
]

export const convertDataSpeciesFile = (rawData) => {
    var exportData = {}
    const arrData = rawData.replaceAll('\t', '').split('\n').filter(item => {
        return item.trim() !== ''
    })

    const idxKeyWord = keyWord.map(item => {
        return arrData.findIndex(e => e.trim().indexOf(item) !== -1)
    })

    const sciName = getDataInline(keyWord[0], arrData.slice(idxKeyWord[0], idxKeyWord[1]))
    if (sciName && sciName !== '') exportData.sci_name = sciName;

    const otherName = getDataInArray(keyWord[1], arrData.slice(idxKeyWord[1], idxKeyWord[2]))
    if (otherName && otherName.length !== 0) exportData.other_name = otherName;

    const vieName = getDataInArray(keyWord[2], arrData.slice(idxKeyWord[2], idxKeyWord[3]))
    if (vieName && vieName.length !== 0) exportData.vie_name = vieName;

    const familyDesc = getDataInline(keyWord[3], arrData.slice(idxKeyWord[3], idxKeyWord[4]))
    if (familyDesc && familyDesc !== '') exportData.family_description = familyDesc;

    const takhtajanSys = getTakhtajanSystemData(arrData.slice(idxKeyWord[4], idxKeyWord[5]))
    if (takhtajanSys && (Object.keys(takhtajanSys).length !== 0)) {
        exportData.takhtajan_system = takhtajanSys;
    }

    const description = getDataInStringArray(arrData.slice(idxKeyWord[5] + 1, idxKeyWord[6]))
    if (description && description !== '') exportData.description_content = description;

    // const micrArr = arrData.slice(idxKeyWord[6] + 1, idxKeyWord[7])

    const distribution = getDataInStringArray(arrData.slice(idxKeyWord[7] + 1, idxKeyWord[8]))
    if (distribution && distribution !== '') exportData.distribution_content = distribution;


    // const phytochemical = getPhytochemical(arrData.slice(idxKeyWord[8] + 1, idxKeyWord[9]))

    const benifits = getDataInStringArray(arrData.slice(idxKeyWord[9] + 1, idxKeyWord[10]))
    if (benifits && benifits !== '') exportData.benefits = benifits;


    const references = getReferences(arrData.slice(idxKeyWord[10] + 1))
    if (references && references.length !== 0) exportData.references = references;

    // console.log(exportData);
    return exportData;
}

// Utils function
const removeCharacters = (str, wordsToRemove) => {
    const pattern = new RegExp(
        wordsToRemove.map(word => word instanceof RegExp ? word.source : word).join('|'),
        'gi'
    );
    const newStr = str.replace(pattern, function(match) {
        if (wordsToRemove.some(
            word => (word instanceof RegExp) ? word.test(match) : (word === match)
        )) {
            return '';
        } else {
            return match;
        }
    })
    return newStr.trim();
}

const getNumberReference = (str) => {
    const pattern = /\[(\d+)\]/;
    const match = str.match(pattern)
    if (match) return parseInt(match[1])
}

const getNomenclature = (str) => {
    const pattern = /\(([^)]+)\)/;
    const match = pattern.exec(str)
    if (match !== null) return match[1]
}

const isValidUrl = (urlString) => {
    try {
        return Boolean(new URL(urlString));
    }
    catch (error) {
        return false;
    }
}

// Get Data function
const getDataInline = (keyWord, arrData) => {
    if (arrData.length === 1) {
        const remove = [keyWord, ':', '.']
        const data = removeCharacters(arrData[0], remove)
        return data;
    }
}

const getDataInArray = (keyWord, arrData) => {
    if (arrData.length === 1) arrData = arrData[0].split(',')
    if (arrData.length !== 0) {
        const remove = [keyWord, ':', /\[(\d+)\]/g, '.']
        const data = arrData.map(item => {
            return {
                name: removeCharacters(item, remove),
                reference: getNumberReference(item) || ''
            }
        })
        return data;
    }
}

const getDataInStringArray = (arrData) => {
    var strData = '';
    if (arrData && arrData.length !== 0) {
        arrData.forEach(item => strData += `<p>${item.trim()}</p>`);
    }
    return strData;
}

const getTakhtajanSystemData = (arrData) => {
    var data = {}
    const keyWord = [
        { key: 'Giới', field: 'kingdom' },
        { key: 'Ngành', field: 'division' },
        { key: 'Lớp', field: 'layer' },
        { key: 'Bộ', field: 'order' },
        { key: 'Họ', field: 'family' },
        { key: 'Chi', field: 'genus' },
        { key: 'Loài', field: 'species' }
    ];
    keyWord.forEach(item => {
        var idxArrData = arrData.findIndex(e => e.indexOf(item.key) !== -1);
        var wordsToRemove = [item.field, ':', /\(([^)]+)\)/g, /\[(\d+)\]/g, '.']
        var name = removeCharacters(arrData[idxArrData], wordsToRemove)
        var nomenclature = getNomenclature(arrData[idxArrData])
        var reference = getNumberReference(arrData[idxArrData])
        data[item.field] = {
            name: name,
            nomenclature: nomenclature,
            reference: reference
        }
    })
    return data;
}

const getReferences = (arrData) => {
    var result = [];
    const orderNumberRegex = /^[0-9]+\./
    arrData.forEach(item => {
        if (!isValidUrl(item) && orderNumberRegex.test(item)) {
            result.push({
                content: removeCharacters(item, [/^[0-9]+\./]).trim(),
                link: '',
                language: 'en'
            })
        } else {
            result[result.length - 1].link = item.trim()
        }
    })
    return result;
}