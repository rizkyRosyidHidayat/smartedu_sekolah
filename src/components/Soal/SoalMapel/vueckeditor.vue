<template>
  <div class="ckeditor">
    <textarea v-bind:id="id" v-bind:value="value"></textarea>
  </div>
</template>

<script>
  const CKEDITOR = window.CKEDITOR;
  // CKEDITOR.plugins.addExternal( 'eqneditor', '/plugins/eqneditor/', 'plugin.js' );  
  let index = 0;

  if (!CKEDITOR) {
    throw new Error('[VueCkeditor] cannot locate CKEDITOR.');
  }

  export default {
    name: 'VueCkeditor',
    props: {
      value: {
        type: String
      },
      id: {
        type: String,
        default: () => `editor-${index+=1}`
      },
      height: {
        type: String,
        default: '300px',
      },
      // toolbar: {
      //   type: Array,
      //   default: () => [
      //     'Format',
      //     ['Bold', 'Italic', 'Strike', 'Underline'],
      //     ['BulletedList', 'NumberedList', 'Blockquote'],
      //     ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
      //     ['Link', 'Unlink'],
      //     ['FontSize', 'TextColor'],
      //     ['Image'],
      //     ['Undo', 'Redo'],
      //     ['Source', 'Maximize']
      //   ]
      // },
      language: {
        type: String,
        default: 'en'
      },
      extraplugins: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        count: 0
      }
    },
    beforeUpdate() {
      const { id } = this;

      if (this.value !== CKEDITOR.instances[id].getData()) {
        CKEDITOR.instances[id].setData(this.value);
      }
    },
    mounted() {
      const { id } = this;
      const config = {
        toolbar: this.toolbar,
        language: this.language,
        height: this.height,
        // removeButtons: 'Underline,Subscript,Superscript',
        removePlugins: 'image',
        extraPlugins: 'eqneditor,language,justify,font,filebrowser,image2,widget',
        filebrowserUploadUrl: 'https://app.smart-edu.id/upload.php',
        filebrowserUploadMethod: 'form',
        // imageUploadURL: 'https://api.app.smart-edu.id/api/school/soal/file/upload',
        // dataParser: function (data) {
        //   console.log(data)
        // }
      };
      CKEDITOR.replace(id, config);
      CKEDITOR.instances[id].setData(this.value);
      CKEDITOR.instances[id].on('change', () => {
        const value = CKEDITOR.instances[id].getData();

        if (value !== this.value) {
          this.$emit('input', value);
        }
      });
    },
    destroyed() {
      const { id } = this;

      if (CKEDITOR.instances[id]) {
        CKEDITOR.instances[id].destroy();
      }
    },
  }
</script>
