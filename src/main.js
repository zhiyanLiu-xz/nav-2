const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" },
];
const simplifyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 / 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove(); //找到所有li，除了last
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
              <div class="site">
              <div class='bg'>
                <div class="logo">${node.logo}</div>
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-close"></use>
                </svg>
                </div>
              </div>
          </li>
      `).insertBefore($lastLi);
    $li.on("click", (e) => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
  render();
  //不需要再添加li了，直接hashMap中添加一项
  //   const $site = $(`<li>
  //   <a href="${url}">
  //     <div class="site">
  //       <div class="logo">${url[8]}</div>
  //       <div class="link">${url}</div>
  //     </div>
  //   </a>
  // </li>
  //   `).insertBefore($lastLi);
});

window.onbeforeunload = () => {
  console.log("页面要关闭了");
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  // const key = e.key;可以简写
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
