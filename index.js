const puppeteer = require('puppeteer');
const readline = require('readline');
(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'], //Failed to launch chrome!
        headless: false, //要看演示可以使用false

    });
    const page = await browser.newPage();
    await page.goto('https://devstore.01hour.com/login.html');
    await page.setViewport({
        width: 1920,
        height: 1080
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
        let btnBox = document.querySelectorAll('.add-popup-btn-group');
        let brandBtn = btnBox[0].children[1];
        brandBtn.click();
        let modelBtn = btnBox[1].children[1];
        modelBtn.click();
        let colorBtn = btnBox[2].children[1];
        colorBtn.click();
        let problemBox = document.querySelector('#problemShow');
        let problemChildBox=problemBox.children;
        problemChildBox[0].click();
        let problemChildBtn=problemChildBox[0].children[1];
        problemChildBtn.click();
    });

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