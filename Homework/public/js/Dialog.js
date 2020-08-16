export default class Dialog extends EventTarget {
  constructor(options) {
    super();
    // 默认配置
    let defalultOptions = {
      width: "30%",
      height: "250px",
      title: "测试标题",
      content: "测试内容",
      dragable: true, //是否可拖拽
      maskable: true, //是否有遮罩
      isCancel: false, //是否有取消
      success() {},
      cancel() {},
    };
    // 合并配置；
    // 作业： 在老师代码基础上用非 Object.assign 方法合并配置（options，defalultOptions）；具体方法不限；有配置传入以传入配置为准 ，没有以默认配置作为配置；
    // this.opts = Object.assign(defalultOptions, options);
    this.opts = this.combineOptions(defalultOptions, options);
    // console.log(opts);
    this.init();
  }

  // 作业要求
  combineOptions(defaultOptions,SetOptions){
    let options = JSON.parse(JSON.stringify(defaultOptions));
    for(let objName in SetOptions){
      // console.log(objName);
      options[objName] = SetOptions[objName];
    }
    // console.log(options);
    return options;
  }

  // 初始化组件方法
  init() {
    this.createElement();
    // this.addEvent("success",this.opts.success);
    this.addEventListener("success", this.opts.success);
    this.addEleEvent();
    if (!this.opts.maskable) {
      this.divEles.querySelector(".k-wrapper").style.display = "none";
    }
    if (this.opts.dragable) {
      this.drag();
    }
  }

  // 创建节点
  createElement() {
    // console.log(this.opts.width)
    let divEles = document.createElement("div");
    divEles.innerHTML = `<div class="k-wrapper"></div>
        <div class="k-dialog" style="width:${this.opts.width};height:${this.opts.height}">
            <div class="k-header">
                <span class="k-title">${this.opts.title}</span><span class="k-close">X</span>
            </div>
            <div class="k-body">
                <span>${this.opts.content}</span>
            </div>
            <div class="k-footer">
                ${this.opts.isCancel ? '<span class="k-default">取消</span>' : ""}
                <span class="k-primary">确定</span>
            </div>
        </div>`;
    divEles.style.display = "none";
    document.body.appendChild(divEles);
    this.divEles = divEles;
  }

  // 添加事件
  addEleEvent() {
    // let closeEle = this.divEles.querySelector(".k-close");
    // closeEle.addEventListener("click",()=>{
    //     this.close();
    // })
    // let cancelEle = this.divEles.querySelector(".k-default") ;
    // console.log(cancelEle)
    // cancelEle &&  cancelEle.addEventListener("click",()=>{
    //     console.log("close")
    // })
    // 事件委托
    let kDialog = this.divEles.querySelector(".k-dialog");
    kDialog.addEventListener("click", (e) => {
      //    console.log(e.target);
      let className = e.target.className;
      //  console.log(className);
      switch (className) {
        case "k-close":
          this.close();
          break;
        case "k-default":
          this.opts.cancel();
          this.close();
          break;
        case "k-primary":
          // this.opts.success();
          // this.trigger("success");
          this.sure();
          this.close();
          break;
        default:
          console.log("未点中");
          break;
      }
    });
  }

  sure(value) {
    let success = new CustomEvent("success", {
      detail: value,
    });
    console.log('触发了sure',this);
    this.dispatchEvent(success);
  }

  // 关闭组件
  close() {
    this.divEles.style.display = "none";
  }
  // 打开组件
  open() {
    // console.log("open");
    this.divEles.style.display = "block";
  }

  drag() {
    let kDialog = this.divEles.querySelector(".k-dialog");
    kDialog.onmousedown = function (e) {
      console.log("鼠标点击");
      let x = e.clientX - this.offsetLeft;
      let y = e.clientY - this.offsetTop;
      this.onmousemove = function (e) {
        let xx = e.clientX;
        let yy = e.clientY;
        this.style.left = xx - x + "px";
        this.style.top = yy - y + "px";
        // console.log("鼠标移动", xx, yy);
      };
      this.onmouseup = function () {
        console.log("鼠标释放");
        this.onmousemove = undefined;
      };
    };
    // document.onmouseleave = function () {
    //   console.log("鼠标移出页面范围");
    //   let kDialogs = this.querySelectorAll(".k-dialog");
    //   kDialogs.forEach((element) => {
    //     element.onmousemove = undefined;
    //   });
    // };
    document.addEventListener("mouseleave", (e)=>{kDialog.onmousemove = undefined;});
  }
}

// 通过继承扩展功能；
export class InputDialog extends Dialog {
  constructor(options) {
    super(options);
    this.createInput();
  }
  createInput() {
    let myInput = document.createElement("input");
    myInput.classList.add("input-inner");
    this.divEles.querySelector(".k-body").appendChild(myInput);
    this.myInput = myInput;
  }
  sure() {
    let value = this.myInput.value;
    super.sure(value);
  }
}

class ShowDialog extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<button>按钮</button>`;
    let dialog = new Dialog({
      title: this.title,
      success:(e) => {
        // console.log("点击了确定")
        // console.log('ShowDialog',this);
        this.dispatchEvent(new CustomEvent("success-ex"));
      },
    });
    // this.title = this.getAttribute("title")
    this.onclick = function () {
      dialog.open();
    };
  }
  get title() {
    return this.getAttribute("title") ?? "默认标题";
  }
}
customElements.define("show-dialog", ShowDialog);
