<template>
   <div class="m_uploadimgMain clearfix">
      <ul class="clearfix">
        <li v-for="(item,index) in attachmentList" class="clearfix">
          <img v-if="item.type=='image'" :src="item.showimg">
          <video v-if="item.type=='video'" :src="item.showimg"></video>
          <img class="clearIcon" src="/static/img/dot-cleartxt.png" @click="delImg(item)">
        </li>
        <li class="f_adduploadimg" v-if="showAddImg">
          <input type="file" class="addFile" @change="changefile">
        </li>
      </ul>
      <div class="m_uploadinfo">
        <span>{{imgnum}}</span>/9 (文件大小不超过10M）
      </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        isupload: false,
        attachmentList: [],
        imgnum: 0,
        showAddImg: true,
      }
    },
    props: {
      /* 倒计时时间戳 */
      endTime: {
        type: String,
        default: '0'
      },
      endText: {
        type: String,
        default: '已结束'
      },
      callback: {
        type: Function,
        default: ''
      },
      /* 当前数据数组 */
      listData:{
        type:  Array,
        default: []
      },
      /* 当前数据索引 */
      index:{
        type: Number,
        default: 0
      },
      showtext:{
        type: String,
        default: ''
      }
    },
    mounted() {
      
    },
    methods: {
      async changefile(els) {
        this.isupload = true;
        if (!els.target.files[0].size) return;
        if (els.target.files[0].size > 10485760) {
          this.$toast("图片不能超过10M");
          return;
        }
        this.fileList(els.target.files); //获取files文件组传入处理
      },
      fileList(files) {
        for (let i = 0; i < files.length; i++) {
          this.fileAdd(files[i]);
        }
      },
      fileAdd(file) {
        let that = this;
        var form = new FormData(); // FormData 对象
        if (file.size / 1024 > 1025) {
          //大于1M，进行压缩上传
          that.photoCompress(
            file,
            {
              quality: 0.2
            },
            function(base64Codes) {
              let bl = that.convertBase64UrlToBlob(base64Codes);
              form.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
              that.upploadimage(form);
            }
          );
        } else {
          //小于等于1M 原图上传
          form.append("file", file); // 文件对象
          that.upploadimage(form);
        }
      },
      // 上传
      async upploadimage(param) {
        let res = await this.$post(api.uploadFile(), param);
        this.attachmentList.push({
          url: res.data.path,
          type: "image",
          name: res.data.fileName,
          showimg: res.data.basePath + res.data.path
        });
        this.imgnum = this.attachmentList.length;
        if (this.attachmentList.length >= 9) {
          this.showAddImg = false;
        } else {
          this.showAddImg = true;
        }
        localStorage.setItem(
          "stuAttachmentList",
          JSON.stringify(this.attachmentList)
        );
      },
      // 图片压缩
      photoCompress(file, w, objDiv) {
        let that = this;
        var ready = new FileReader();
        /*开始读取指定File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
        ready.readAsDataURL(file);
        ready.onload = function() {
          var re = this.result;
          that.canvasDataURL(re, w, objDiv);
        };
      },
      canvasDataURL(path, obj, callback) {
        let img = new Image();
        img.src = path;
        img.onload = function() {
          let that = this;
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || w / scale;
          let quality = 0.7; // 默认图片质量为0.7
          //生成canvas
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          // 创建属性节点
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL("image/jpeg", quality);
          // 回调函数返回base64的值
          callback(base64);
        };
      },
      convertBase64UrlToBlob(urlData) {
        let arr = urlData.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      },
      /**
       * @description: base64 转文件
       * @param {type}
       * @return: file
       */
      convertBase64UrlToBlob(urlData) {
        let arr = urlData.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      },
      /**
       * 说明:删除图片
       * 作者:raq
       * 更新时间:2019-03-26
       */
      delImg(item) {
        var indexImg = this.attachmentList.findIndex(function(value, index, arr) {
          return value.name == item.name;
        });
        this.attachmentList.splice(indexImg, 1);
        this.imgnum = this.attachmentList.length;
        localStorage.setItem(
          "stuAttachmentList",
          JSON.stringify(this.attachmentList)
        );
      },
    },
  }
</script>
<style scoped lang="scss">
    .m_uploadimgMain {
    clear: both;
    ul {
      width: 100%;
      float: left;
      clear: both;
    }
    li {
      width: px2rem(220px);
      height: px2rem(200px);
      position: relative;
      overflow: hidden;
      float: left;
      background: #eff1f3;
      margin-right: px2rem(10px);
      margin-bottom: px2rem(10px);
      * {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .clearIcon {
        left: 85%;
        top: 14%;
        width: px2rem(40px);
        height: px2rem(40px);
      }
    }
    .f_adduploadimg {
      width: px2rem(220px);
      height: px2rem(200px);
      background: url(../../../../assets/upimgbg.png) #eff1f3 no-repeat center;
      background-size: auto 50%;
      position: relative;
      overflow: hidden;
      .addFile {
        opacity: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        position: absolute;
        left: 50%;
        top: 50%;
      }
      .addImgIcon {
        width: px2rem(200px);
        height: px2rem(200px);
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
    .m_uploadinfo {
      float: left;
      width: 100%;
      padding-top: px2rem(20px);
      font-size: px2rem(24px);
      color: #909399;
    }
  }
</style>