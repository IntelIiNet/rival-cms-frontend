import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditorComponent = ({ onChange, value }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  ) : (
    <div>Loading editor...</div>
  );
};

export default CKEditorComponent;
