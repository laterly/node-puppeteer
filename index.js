const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'], //Failed to launch chrome!
        headless: false, //要看演示可以使用false
        defaultViewport:{
            width:1920,
            height:950
        }

    });
    const page = await browser.newPage();
    await page.goto('https://devstore.01hour.com/login.html');
    // await page.setViewport({
    //     width: 1200,
    //     height: 780
    // });
    await page.type('#login-username', '18620776758');
    await page.type('#login-password', '776758');
    await page.click('#login-btn');
    await page.waitFor(1000);
    await page.click('.layui-form-select');
    await page.evaluate(() => {
        let layuiOption = document.querySelector('.layui-anim').children;
        for (let i = 0; i < layuiOption.length; i++) {
            if (layuiOption[i].getAttribute('lay-value') == 1)
                layuiOption[i].click();
        }
        layui.form.render();
    });
    await page.click('#store-login');
    await page.waitFor(10000);
    const frames = await page.frames(); //得到所有的frame框
    frames[1].evaluate(() => {
        let repairBtn = document.querySelectorAll('.pull-left')[1];
        repairBtn.click();
    });
    await page.waitFor(1000);
    frames[1].evaluate(() => {
        let btnBox = document.querySelectorAll('.add-popup-btn-group');
        let brandBtn = btnBox[0].children[3];
        brandBtn.click();
    });
    await page.waitFor(1000);
    frames[1].evaluate(() => {
        let btnBox = document.querySelectorAll('.add-popup-btn-group');
        let modelBtn = btnBox[1].children[1];
        modelBtn.click();
    });
    await page.waitFor(1000);
    frames[1].evaluate(() => {
        let btnBox = document.querySelectorAll('.add-popup-btn-group');
        let colorBtn = btnBox[2].children[1];
        colorBtn.click();
    });
    await page.waitFor(1000);
    frames[1].evaluate(() => {
        let problemChildBox = document.querySelectorAll('#problemShow button');
        problemChildBox[0].click();
        problemChildBox[1].click();
    });
    await page.waitFor(1000);
    frames[1].evaluate(() => {
        let problemChildBox = document.querySelectorAll("#problemShow .layui-colla-item");
        problemChildBox[0].children[1].children[0].children[0].children[1].click();
        problemChildBox[1].children[1].children[0].children[1].children[1].click();
    });
    // await page.waitFor(1000);
    // frames[1].evaluate(() => {
    //     let nameInput = document.querySelectorAll(".add-popup-form-row")[1].children[0].children[0].children[1].children[0];
    //     nameInput.focus();
    //     nameInput.value= '测试下单';
    //     layui.form.render();
    // });
    // await page.waitFor(1000);
    // frames[1].evaluate(() => {
    //     let phoneInput = document.querySelectorAll(".add-popup-form-row")[1].children[2].children[0].children[1].children[0];
    //     phoneInput.focus()
    //     phoneInput.value = "13609724369";
    //     layui.form.render();
    // });
    await page.waitFor(1000);
    frames[1].evaluate(() => {
        let layuiOption = document.querySelectorAll(".add-popup-form-row")[0].children[0].children[0].children[1].children[1].children[1].children;
      for (let i = 0; i < layuiOption.length; i++) {
        if (layuiOption[i].getAttribute("lay-value") == 1) 
        layuiOption[i].click();
      }
      layui.form.render();
    });
    frames[1].evaluate(() => {
        let repairOrderBtn = document.querySelectorAll(".add-popup-submit button")[1];
        repairOrderBtn.click();
    });
    //下单成功
    await page.waitFor(2000000);
    //选择师傅
    frames[1].evaluate(() => {
        let layuiOption = document.querySelector(".work-right-basic").children[6].children[0].children[0].children[0].children[1].children[0].children[1].children[1].children;
        for (let i = 0; i < layuiOption.length; i++) {
            if (Number(layuiOption[i].getAttribute("lay-value")) == 25) 
            layuiOption[i].click();
        }
        layui.form.render();
    });
    frames[1].focus(".text-blockinput > input");
    frames[1].type("11111"); 
    await page.waitFor(2000);
    //点击保存
    frames[1].evaluate(() => {
        let btn = document.querySelectorAll(".oh-work-btn")[0];
        btn.click();
    });
    await page.waitFor(2000);
    //点击开始维修
    frames[1].evaluate(() => {
        let btn = document.querySelectorAll(".oh-work-btn")[1];
        btn.click();
    });
    await page.waitFor(2000);
    //点击完成维修
    frames[1].evaluate(() => {
        let btn = document.querySelectorAll(".oh-work-btn")[1];
        btn.click();
    });
    //不需要配件
    frames[1].evaluate(() => {
        let btn = document.querySelector('.layui-layer-btn0')
        btn.click();
    });
    await page.waitFor(2000);
    //输入imei号码
    // frames[1].$(".text-blockinput input"); 
    await page.waitFor(100000);
    await browser.close();
})();

// const list = await page.evaluate(() => {
//     return [...document.querySelectorAll('dd')].map(function (e, i) {
//         return e.textContent;
//     })
// })
// console.log(20180714211647, list);
//page.evaluate(()=> alert('1')); 在浏览器中执行一段 JavaScript 代码