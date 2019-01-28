const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'], //Failed to launch chrome!
        headless: false, //要看演示可以使用false

    });
    const page = await browser.newPage();
    await page.goto('https://devstore.01hour.com/login.html');
    await page.setViewport({
        width: 1200,
        height: 780
    });
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
         let problemChildBox = document.querySelectorAll('#problemShow .layui-colla-content .layui-form-checkbox')[0];
         let problemChildBtn = problemChildBox.children[1];
         problemChildBtn.click();
         let problemChildBox2 = document.querySelectorAll('#problemShow .layui-colla-content .layui-form-checkbox')[1];
         let problemChildBtn2 = problemChildBox2.children[1];
         problemChildBtn2.click();
     });
     await page.waitFor(1000);
     await page.type('#login-username', '18620776758');
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