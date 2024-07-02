import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { typeFilePond } from '@/types/marketplaces/cadastrar';
const FilePond = dynamic(() => import('react-filepond').then(module => {
  const { registerPlugin } = module;
  const FilePondPluginImageExifOrientation = require('filepond-plugin-image-exif-orientation');
  const FilePondPluginImagePreview = require('filepond-plugin-image-preview');
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  return module.FilePond;
}), { ssr: false });

export default function FilePonds(props:typeFilePond) {
  const [files, setFiles] = useState([
  
  ]);

  const handleInit = () => {
    console.log("FilePond instance has initialised");
  };

  const handleUpdateFiles = (fileItems :File) => {
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

  return (
    <div className="h-full">
      <FilePond 
        files={files}
        allowMultiple={true}
        allowReorder={true}
             maxFiles={3}
        server={{ process: null}}  
        name="files"
        oninit={handleInit}
        onupdatefiles={handleUpdateFiles}
        labelIdle={`Arraste ou solte o arquivo de ${props.titulo} <span class="filepond--label-action">Navegar</span>`}

      />
    </div>
  );
}
