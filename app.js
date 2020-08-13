var express = require('express');
var bodyParser = require('body-parser');
//testing git commit to repository

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', {error: '',error1: ''});
});

app.post('/buttonlogin', urlencodedParser, function(req, res){
    if(req.body.address==undefined){
        res.render('index', {error: 'Access Denied! Please select site first...',error1: ''});
    }else{
        const {Builder, By, Key, util} = require("selenium-webdriver");
        var useragent = require('useragent');
        var agent2 = useragent.parse(req.headers['user-agent'], req.query.jsuseragent);

        if(agent2.family=='Chrome'){
            require("chromedriver");
            var browser = "chrome";
        }else if(agent2.family=='Firefox'){
            require("geckodriver");
            var browser = "firefox";
        }else if(agent2.family=='Edge'){
            res.render('index', {error: 'Access Denied! MS Edge not yet supported by Selenium. Please use other browser. Thank You.',error1: ''});
            //const edge = require("@microsoft/edge-selenium-tools");
            // Launch Microsoft Edge (EdgeHTML)
            //let driver = edge.Driver.createSession();
            // Launch Microsoft Edge (Chromium)
            //let options = new edge.Options().setEdgeChromium(true);
            //let driver = edge.Driver.createSession(options);
        }
        let driver = new Builder().forBrowser(browser).build();

        if(req.body.address=='qa1'){
            var address = "https://volumeup-qa1.skydev.solutions/login";
            var unameid = "__BVID__15";
            var pwdid = "__BVID__17";
        }else{
            var address = "https://volumeup-qa2.skydev.solutions/login";
            var unameid = "__BVID__70";
            var pwdid = "__BVID__72";
        }    
        driver.get(address);
    
        driver.findElement(By.id(unameid)).sendKeys(req.body.uname,Key.RETURN);
        driver.findElement(By.id(pwdid)).sendKeys(req.body.pwd,Key.RETURN);
    
        let keeplog = "//label[contains(text(),'Keep me logged in')]";
        driver.findElement(By.xpath(keeplog)).click();
        
        let xPath = "//button[contains(text(),'Login')]";
        driver.findElement(By.xpath(xPath)).click();
    
        console.log(req.body);
        res.redirect('/');
        //res.send('testing');
    }
    
});

app.post('/buttonregister', urlencodedParser, function(req, res){
    console.log(req.body);
    if(req.body.address==undefined){
        res.render('index', {error: '',error1: 'Access Denied! Please select site first...'});
    }else{
        const {Builder, By, Key, util} = require("selenium-webdriver");
        var useragent = require('useragent');
        var agent2 = useragent.parse(req.headers['user-agent'], req.query.jsuseragent);

        if(agent2.family=='Chrome'){
            require("chromedriver");
            var browser = "chrome";
        }else if(agent2.family=='Firefox'){
            require("geckodriver");
            var browser = "firefox";
        }else if(agent2.family=='Edge'){
            res.render('index', {error: 'Access Denied! MS Edge not yet supported by Selenium. Please use other browser. Thank You.',error1: ''});
        }
        let driver = new Builder().forBrowser(browser).build();

        if(req.body.address=='qa1'){
            var address = "https://volumeup-qa1.skydev.solutions/register";
            var unamerid = "__BVID__14";
            var pwdrid = "__BVID__16";
            var emailaddid = "__BVID__18";
            var bdayid = "__BVID__20";
        }else{
            var address = "https://volumeup-qa2.skydev.solutions/register";
            var unamerid = "__BVID__69";
            var pwdrid = "__BVID__71";
            var emailaddid = "__BVID__73";
            var bdayid = "__BVID__75";
        }    
        driver.get(address);
    
        driver.findElement(By.id(unamerid)).sendKeys(req.body.unamer,Key.RETURN);
        driver.findElement(By.id(pwdrid)).sendKeys(req.body.pwdr,Key.RETURN);
        driver.findElement(By.id(emailaddid)).sendKeys(req.body.emailadd,Key.RETURN);
        var bday = new Date(req.body.bday);
        var month = ("0" + (bday.getMonth() + 1)).slice(-2);
        var daynum = ("0" + bday.getDate()).slice(-2);
        var bdayr = daynum+"/"+month+"/"+bday.getFullYear();
        driver.findElement(By.id(bdayid)).sendKeys(bdayr,Key.RETURN);

        let agree1 = "//label[@for='chk-terms']";
        driver.findElement(By.xpath(agree1)).click();

        let agree2 = "//label[@for='chk-privacy']";
        driver.findElement(By.xpath(agree2)).click();

        let xPath = "//button[contains(text(),'Signup')]";
        driver.findElement(By.xpath(xPath)).click();
    
        console.log(req.body);
        res.redirect('/');
        //res.send('testing');
    }
});

app.get('/ua', function(req, res){
    var useragent = require('useragent');
    //useragent(true);
    //var agent = useragent.lookup(req.headers['user-agent']);
    var agent2 = useragent.parse(req.headers['user-agent'], req.query.jsuseragent);
    //var ua = useragent.is(req.headers['user-agent'])

    res.send('user ' + agent2.family);
});

app.listen(3000,'localhost');

console.log('Port 3000');