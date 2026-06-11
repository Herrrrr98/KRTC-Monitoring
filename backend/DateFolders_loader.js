const fs = require('fs');
const path = require('path');
const config = require('../config.json');

async function DateFolders_loader() {
    const abs_src_folder = path.resolve(__dirname, config.src_Folder);
    try{
        var DateFolders = [];
        var folders = fs.readdirSync(abs_src_folder, { withFileTypes: true }).filter(counts => counts.isDirectory());
        for(let repeat = 0; repeat < folders.length; repeat++){
                DateFolders.push(folders[repeat].name);
        }
        return {alive: true, data: DateFolders};
    }catch(e){
        console.error(e);
        return {alive: false, data: null};
    }
};

module.exports = DateFolders_loader;