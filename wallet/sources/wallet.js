// This work was done for the first competition - the design of the Telegram wallet
// This work is ONLY A CONCEPT, not a working version of the finished product.

document.addEventListener("DOMContentLoaded", function(event){
	const d = document;
	const page = d.location.href;
	const tg = window.Telegram.WebApp;
	const appHeight = Math.floor(tg.viewportStableHeight);
	const appWidth = Math.floor(window.innerWidth);
	const podvalUrl = ['index.html','space.html','explore.html','market.html','settings.html'];
    const podvalPic = ['wallet3.png','space3.png','app3.png','market3.png','settings3.png'];
	const podvalAct = ['wallet2.png','space2.png','app2.png','market2.png','settings2.png'];
    const podvalText = ['Wallet','Space','Explore','Market','Settings'];
	const titleApp = 'Wallet';
	statusDrag = false;
	const sensitivity = 20;

	function isLoaded(){
		buildApp();
	}
	function buildApp(){
		var appTitle = d.querySelector('title');
		appTitle.innerHTML = titleApp;
		console.log(appWidth+" / "+appHeight);
		appblockH = Math.ceil((appHeight*9/100)+5);
		appblockF = Math.ceil((appHeight*9/100)+33);
		appblockM = appHeight - (appblockH + appblockF) + 13;
		console.log(appblockM);
		hBlockH = Math.ceil((appblockM*60/100)-30);
		hBlockF = appblockM-hBlockH;
		nfBlockW = Math.ceil(appWidth/5);
		
		var appHead = d.querySelector('#sectorHead');appHead.setAttribute("style","height:"+appblockH+"px;");
		var appFoot = d.querySelector('#sectorFoot');appFoot.setAttribute("style","height:"+appblockF+"px;");
		var appMidd = d.querySelector('#sectorMidd');appMidd.setAttribute("style","height:"+appblockM+"px;");
		var hSectorHead = d.querySelector('#midHead');hSectorHead.setAttribute("style","width:100%;");
		var hSectorFoot = d.querySelector('#midBody');hSectorFoot.setAttribute("style","width:100%;");
		var podvalBlock = d.querySelector('#butPodval');
		var pagePars = page.split("/").pop();
		var NpagePars = pagePars.substring(0, pagePars.length - 5);

		var nftBlock = d.querySelectorAll('.nftActive');
		for(i=0;i<nftBlock.length;i++){
			var nftWidth = nftBlock[i];
			nftWidth.setAttribute("style","width:"+nfBlockW+"px;height:"+nfBlockW+"px;");
		}
        for(u = 0, ut = podvalUrl.length; u < ut; u++){
        var pUrl = podvalUrl[u];
        var pImg = podvalPic[u];
        var pAmg = podvalAct[u];
        var pTxt = podvalText[u];
			if(pUrl == ''){
				var pImg = 'lock.png';
				podvalBlock.insertAdjacentHTML('beforeEnd', '<div class="-butt"><a href="./'+pUrl+'"><div class="-buttIco rButton"><img src="./assets/icons/'+pImg+'" class="m_butt"></div></a><div class="-fText">'+pTxt+'</div></div>');
			}else if(pUrl == pagePars){
				podvalBlock.insertAdjacentHTML('beforeEnd', '<div class="-butt -activ"><a href="./'+pUrl+'"><div class="-buttIco rButton"><img src="./assets/icons/'+pAmg+'" class="m_butt"></div></a><div class="-fText">'+pTxt+'</div></div>');
			}else{
				podvalBlock.insertAdjacentHTML('beforeEnd', '<div class="-butt"><a href="./'+pUrl+'"><div class="-buttIco rButton"><img src="./assets/icons/'+pImg+'" class="m_butt"></div></a><div class="-fText">'+pTxt+'</div></div>');
			}
        }
		switch(NpagePars){
			case podvalText[0].toLowerCase(): //wallet
				hSectorHead.setAttribute("style","height:343px;");
				hSectorFoot.setAttribute("style","max-height:300px;");
				balPan = d.querySelector('#balancePanel');
				balPanHeight = Math.ceil((hSectorHead.offsetHeight*60/100)-30);
				balPan.setAttribute("style","height:"+balPanHeight+"px;");
				console.log(balPanHeight);
				break;
			case podvalText[1].toLowerCase(): //space
				appSection = d.querySelector('#appSection');
				appSection.setAttribute("style","background-color: #3d3d3d;");				
				hSectorFoot.setAttribute("style","max-height:300px;");
				break;
			case podvalText[2].toLowerCase(): //explore
				hSectorHead.setAttribute("style","height:0px;");
				appHead.setAttribute("style","background-color:#fff;");
				hSectorFoot.setAttribute("style","height:"+appblockM+"px;border-radius:0px;");
				break;
			case podvalText[3].toLowerCase(): //Market
				//hSectorHead.setAttribute("style","height:0px;");
				//appHead.setAttribute("style","background-color:#fff;");
				//hSectorFoot.setAttribute("style","height:"+appblockM+"px;border-radius:0px;");
				break;
			case podvalText[4].toLowerCase(): //Settings
				hSectorHead.setAttribute("style","height:0px;");
				appHead.setAttribute("style","background-color:#fff;");
				hSectorFoot.setAttribute("style","height:"+appblockM+"px;border-radius:0px;");
				break;
			default:
				hSectorHead.setAttribute("style","height:343px;max-height:300px;");
				break;
		}

		//tabs
		massTabs = document.querySelectorAll(".mTabs");
		myArray = [...massTabs];
		Array.from(massTabs, el => el.addEventListener('click', e => {tabsClick(e);}));
		Array.from(massTabs, el => el.addEventListener('touchstart', e => {tabsClick(e);}));
		function tabsClick(e){
			tabsNow = e.target;
			tabsCont = tabsNow.classList.contains('mTabs');
			if(tabsCont == true){
				tTrue = tabsNow.classList.contains('-active');
				if(tTrue == true){}else{
					tabActive = document.querySelector(".-active");
					if(tabActive){
						tabActive.classList.remove('-active');
						tabsNow.classList.add('-active');
						if(tabsNow.id == 'earn' || tabsNow.id == 'earns'){							
							var persData=d.querySelector('#persData');
							if(persData){
								persData.setAttribute("style","margin-bottom:75px;");
							}
						}else{
							var persData=d.querySelector('#persData');
							if(persData){
								persData.setAttribute("style","margin-bottom:0px;");
							}
						}
						panelTab = document.querySelectorAll(".panelT");
						var tempPerch = myArray.indexOf(tabsNow);
						tempTab = panelTab[tempPerch];
						panelActive = document.querySelector(".-visible");
						panelActive.classList.remove('-visible');
						var statusTab = tempTab.classList.contains('-visible');
						if(statusTab == false){
							tempTab.classList.toggle('-visible');
						}
					}
				}
			}else{
				getParentTabs = tabsNow.parentElement;
				tabsCont = getParentTabs.classList.contains('-active');
				if(tabsCont == true){}else{
					tabActive = document.querySelector(".-active");
					if(tabActive){
						tabActive.classList.remove('-active');
						var tag = getParentTabs.classList.add('-active');
						console.log(tag.id);
						if(tabsNow.id == 'earn' || tabsNow.id == 'earns'){
							var persData=d.querySelector('#persData');
							if(persData){
								persData.setAttribute("style","margin-bottom:75px;");
							}
						}else{
							var persData=d.querySelector('#persData');
							if(persData){
								persData.setAttribute("style","margin-bottom:0px;");
							}							
						}
						panelTab = document.querySelectorAll(".panelT");
						var tempPerch = myArray.indexOf(getParentTabs);
						tempTab = panelTab[tempPerch];
						panelActive = document.querySelector(".-visible");
						panelActive.classList.remove('-visible');
						var statusTab = tempTab.classList.contains('-visible');
						if(statusTab == false){
							tempTab.classList.toggle('-visible');
						}						
					}
				}
			}
		}

		Swap();
		function Swap(){
			var touchStart = null;
			var touchPosition = null;
			appMidd.addEventListener('touchstart', (e) => {
				e.preventDefault();				
				statusDrag = true;				
				touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
				touchPosition = { x: touchStart.x, y: touchStart.y };
			});			
			appMidd.addEventListener('touchend', (e) => {
				statusDrag = false;
			});	
			appMidd.addEventListener('touchmove', (e) => {
				touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };		
			});	
			appMidd.addEventListener('touchend', (e) => {
				CheckAction();
				touchStart = null;
				touchPosition = null;
			});
			
			function CheckAction(){
				var d = 
				{
				x: touchStart.x - touchPosition.x,
				y: touchStart.y - touchPosition.y
				};
				var msg = "";		
				if(Math.abs(d.x) > Math.abs(d.y)){
					if(Math.abs(d.x) > sensitivity){
						if(d.x > 0){
							msg = "Swipe Left";
							swapLeft();						
						}else{
							msg = "Swipe Right";
							swapRight();
						}
					}
				}else{
					if(Math.abs(d.y) > sensitivity){
						if(d.y > 0){
							msg = "Swipe up";						
							swapUp();
						}else{
							msg = "Swipe down";
							swapDown();						
						}
					}
				}								
			}			
		}
		function swapUp(){//up
			var swapFoot = document.querySelector('#midBody');
			var actButH = document.querySelector('.actionButPan');						
			var supNftBut = document.querySelector('.supNftBut');
			var tabsActiveMove = document.querySelector('.-active');
			console.log(tabsActiveMove.id);
			if(tabsActiveMove.id == "collections"){
				tabHeightT = 340;
			}else if(tabsActiveMove.id == "earns"){
				tabHeightT = 300;
			}else if(tabsActiveMove.id == "myAds" || tabsActiveMove.id == "myOrders"){
				tabHeightT = 370;
			}else{
				tabHeightT = 520;
			}
			if(actButH){
				swapFoot.setAttribute("style","max-height:"+tabHeightT+"px;height:"+tabHeightT+"px;transition: height 4s ease-in-out 1s;");
				actButH.setAttribute("style","display: none;");
			}
			if(supNftBut){
				supNftBut.setAttribute("style","display:flex;justify-content:center;height:25px;");							
			}
		}
		function swapDown(){//down
			var swapFoot = document.querySelector('#midBody');
			var actButH = document.querySelector('.actionButPan');
			var supNftBut = document.querySelector('.supNftBut');
			if(actButH){
				swapFoot.setAttribute("style","max-height:300px;");
				actButH.setAttribute("style","display:flex;");
			}
			if(supNftBut){
				supNftBut.setAttribute("style","display:none;");							
			}
		}
		function swapLeft(){//++
			var pageNowSwap = pagePars;
			var swapPos = podvalUrl.indexOf(pageNowSwap);
			if(swapPos == 0){
				sledPage = podvalUrl[swapPos + 1];
				window.location.href = ''+sledPage;
			}else if(swapPos == podvalUrl.length-1){//значит текущая страница последняя
			}else if(swapPos > 0 && swapPos < (podvalUrl.length - 1)){//делаем плюс 1 вправо
				sledPage = podvalUrl[swapPos + 1];
				window.location.href = ''+sledPage;
			}
		}
		function swapRight(){//--
			var pageNowSwap = pagePars;
			var swapPos = podvalUrl.indexOf(pageNowSwap);
			if(swapPos == 0){
			}else if(swapPos == podvalUrl.length - 1){
				predPage = podvalUrl[swapPos - 1];
				window.location.href = ''+predPage;
			}else if(swapPos > 0 && swapPos < (podvalUrl.length - 1)){
				predPage = podvalUrl[swapPos - 1];
				window.location.href = ''+predPage;
			}
		}
	}
	isLoaded();	
});
