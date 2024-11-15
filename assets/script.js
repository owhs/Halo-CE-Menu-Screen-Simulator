window.addEventListener('load', async e => {
	const
		doc = document, bod = doc.body, bodClass = bod.classList,
		$ = (s,ss)=>(!ss ? doc : ss)["querySelectorAll"](s),
		$$ = (s,ss)=>(!ss ? doc : ss)["querySelector"](s),
		video = $$("video"),music = $$("audio"),
		keys = {
			UP: ["ArrowUp", "KeyW"],
			DOWN: ["ArrowDown", "KeyS"],
			RIGHT: ["ArrowRight", "KeyD"],
			LEFT: ["ArrowLeft", "KeyA"],
			LEFTBUMP: ["KeyQ"],
			RIGHTBUMP: ["KeyE"],
			ESCAPE: ["Escape","Backspace"],
			ENTER: ["Enter","Space"]
		},
		campaign = [["The Pillar of Autumn","Escape intact as Covenant forces board your ship."],["Halo","Seek out surviving Marines and help them fight the Covenant."],["Truth and Reconciliation","Board a Covenant ship in an attempt to rescue Captain Keyes."],["The Silent Cartographer","Search for the map room that will lead you to the secrets of Halo."],["Assault on the Control Room","Defend the Control Room against wave after wave of Covenant troops."],["343 Guilty Spark","Creep through a swamp to meet the only enemies the Covenant fear."],["The Library","Fight your way through an ancient security facility in search of the index."],["Two Betrayals","Reactivate the weapon at the heart of Halo..and learn the truth."],["Keyes","Stage a one-cyborg assault on a Covenant ship and bring back the Captain."],["The Maw","Destroy Halo before Halo destroys all life in the galaxy."]],
		levels = [["Boarding Action","Ship-to-Ship Combat."],["Rat Race","Up the Ramps, Down the Tubes."],["Prisoner","Get on Top."],["Hang 'Em High","Tombstones for Everybody."],["Blood Gulch","The Quick and the Dead."],["Wizard","Round and Round and Round."],["Derelict","Deep Space Anomaly #0198."],["Longest","A long walk down a short hall..."],["Battle Creek","Splash Splash, Bang Bang."],["Sidewinder","Red Blood, White Snow"],["Damnation","Covenant Hydro-Processing Center."],["Chill Out","Dude, you really need to..."],["Chiron TL-34","Spartan Clone Training Complex."]],
		settings = {"interface":{"label":"Interface Options","optLabel":"Interface","class":"i-browser","options":{"s_1":{"label":"Resolution","tooltip":"Resolution of background video of Halo","options":[["240p",""],["720p","720"],["1080p","1080"]],"fn":t=>changeResolution(t.value)},"s_bgsp":{"label":"Background playback speed","tooltip":"Background video playback speed","options":[["1x",1],["2x",2],["0.5x",0.5],["0.75x",0.75]],"fn":t=>video.playbackRate=t.value},"s_2":{"label":"UI Background Effects","tooltip":"Shimmer effect on background of window elements","options":[["Enabled","Enabled"],["Disabled","Disabled"]],"fn":t=>bodClass[t.selectedIndex===1?"add":"remove"]("noUIBg")},"s_3":{"label":"UI Transitions","tooltip":"Transition effects whilst navigating windows","options":[["Enabled","Enabled"],["Disabled","Disabled"]],"fn":t=>bodClass[t.selectedIndex===1?"add":"remove"]("noUITrans")},"s_4":{"label":"Show Cursor","tooltip":"Show... the ... cursor...?","options":[["No","No"],["Yes","Yes"]],"fn":t=>bodClass[t.selectedIndex===1?"add":"remove"]("showCursor")}}},"sound":{"label":"Sound","optLabel":"Sound","class":"i-volume","options":{"s_5":{"label":"Background Music","tooltip":"Play background theme music","options":[["Disabled","Disabled"],["Enabled","Enabled"]],"fn":t=>{musicPlaying=t.selectedIndex===1;t.parentElement.nextElementSibling.classList[!musicPlaying?"add":"remove"]("hidden");if(navigator.userActivation.hasBeenActive){music[musicPlaying?"play":"pause"]()}}},"s_vol":{"label":"Music Volume","class":"hidden","tooltip":"Background theme music volume","options":[["9","9"],["8","8"],["7","7"],["6","6"],["5","5"],["4","4"],["3","3"],["2","2"],["1","1"]],"fn":t=>{music.volume=1*((+t.value)/9)}},"s_6":{"label":"Interface Sounds","tooltip":"Interface sounds (button press sounds)","options":[["Enabled","Enabled"],["Disabled","Disabled"]],"fn":t=>UISounds=t.selectedIndex===0}}}};
	var musicPlaying = false,
		UISounds = true;
		
	//<figure><div class="pad"><div class="fImg"></div><div class="desc"><h3>Halo</h5>Seek out surviving Marines and help them fight the Covenant.</div></figure>
	
	
	var mWin = $$("#maps>.window");
	campaign.forEach(c=>{
		var f = doc.createElement("figure"), p = doc.createElement("div"), fi = doc.createElement("div"), des = doc.createElement("div");
		p.classList.add("pad");fi.classList.add("fImg");des.classList.add("desc");
		f.append(p);
		p.append(fi,des);
		des.innerHTML="<h3>"+c[0]+"</h3>"+c[1];
		mWin.append(f);
	});
	$$("figure",mWin).classList.add("active");
	
	mWin = $$("#multiplayer>.window");
	levels.forEach(c=>{
		var f = doc.createElement("figure"), p = doc.createElement("div"), fi = doc.createElement("div"), des = doc.createElement("div");
		p.classList.add("pad");fi.classList.add("fImg");des.classList.add("desc");
		f.append(p);
		p.append(fi,des);
		des.innerHTML="<h3>"+c[0]+"</h3>"+c[1];
		mWin.append(f);
	});
	
	$$("figure",mWin).classList.add("active");
	
	var sWin = $$("#settings>.window"), sOpt = $$(".options",sWin), sPre = $$(".preview",sWin);
	
	//console.log(settings);
	
	//console.log(settings);
	//<a screen="interface" class="active">Interface</a>
	//<div screen="interface" class="active i-browser" label="Interface Options">
	
	
	Object.keys(settings).forEach(ss=>{
		var settDesc = document.createElement("div");
		settDesc.classList.add("desc");
		
		var sCon = document.createElement("div"),sOpta = document.createElement("a");
		sOpta.setAttribute("screen",ss);sOpta.innerText=settings[ss].optLabel;
		if (settings[ss].class) {sCon.classList.add(settings[ss].class);}
		sCon.setAttribute("label",settings[ss].label);sCon.setAttribute("screen",ss);
		var opts = settings[ss].options;
		if (opts) {
			var cont = document.createElement("div");
			cont.classList.add("content");
			
			Object.keys(opts).forEach(k=>{
				var lbl = document.createElement("label"),span = document.createElement("span"),select = document.createElement("select"),
					buttonP = document.createElement("div"),buttonN = document.createElement("div");
				span.innerText = opts[k].label;
				buttonP.classList.add("prev","btn");buttonN.classList.add("next","btn");
				select.id = k;
				lbl.setAttribute("tooltip",opts[k].tooltip||"");
				opts[k].options.forEach(opA=>{
					var oEl = document.createElement("option");
					oEl.innerText = opA[0];
					oEl.value = opA[1];
					select.append(oEl);
				});
				if (opts[k].fn) select.addEventListener("change",ev=>{
					var t = ev.target;
					opts[k].fn(t,ev);
					location.hash=[...document.querySelectorAll("#settings select")].map(s=>s.selectedIndex).join("");
				});
				if (opts[k].class) lbl.classList.add(opts[k].class);
				lbl.setAttribute("tabIndex","-1");
				lbl.append(span,buttonP,select,buttonN);
				lbl.addEventListener("selected",ev=>{
					var t = ev.target,p=t.parentElement;
					p.setAttribute("tooltip",$$(".active",p).getAttribute("tooltip"));
				});
				cont.append(lbl);
			});
			//cont.append(settDesc);
			
			sCon.append(cont);
			$("label:first-child",sCon).forEach(z=>z.classList.add("active"));
		}
		sOpt.append(sOpta);sPre.append(sCon);
		$("label:first-child",sCon).forEach(z=>z.dispatchEvent(new Event("selected")));
	});
	$(".options>a:first-child,.preview>div:first-child",sWin).forEach(z=>z.classList.add("active"));
	
	let audioBuffer; // To store the loaded audio buffer

	// Function to load and decode the audio file
	async function loadAudio(url) {
		const audioContext = new (window.AudioContext || window.webkitAudioContext)();
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
		return audioContext;
	}

	// Function to play a specific sprite
	function playSprite(audioContext, startMs, durationMs) {
		if (!audioBuffer) {
			return;
		}

		// Convert milliseconds to seconds for Web Audio API
		const startSeconds = startMs / 1000;
		const durationSeconds = durationMs / 1000;

		const source = audioContext.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(audioContext.destination);

		// Play the sprite section
		source.start(0, startSeconds, durationSeconds);
	}

	// Usage Example:
	// Define the audio sprite map with start times and durations in milliseconds
	const audioSprites = {
		back: { start: 0, duration: 168 },
		cursor: { start: 200, duration: 118 },
		fail: { start: 350, duration: 507 },
		fwd: { start: 900, duration: 121 },
	};
	
	var audioContext;
    // Play a specific sprite (e.g., sprite1)
    //playSprite(audioContext, audioSprites.back.start, audioSprites.back.duration);
	var curScreen="home", lastScreen="", subScreen="";
	
	music.src = "assets/ui/bg.mp3";
	video.src = "assets/ui/bg.mp4";
	video.onloadeddata = async ()=>{
		setTimeout(()=>setInterval(()=>{
			video.classList[video.currentTime>(video.duration - 3) ? "add" : "remove"]("faded");
		},250),500);
	};
	window.changeResolution = res=>{
		var time = video.currentTime;
		video.src = "assets/ui/bg"+(res ? "-"+res : "")+".mp4";
		video.currentTime = time;
		video.playbackRate = $$("#s_bgsp").value;
	};
	
	
	// BG Player (Pause when not focused)
	doc.addEventListener('visibilitychange', () =>{
		bod.classList[doc.hidden ? "add" : "remove"]("paused");
		video[doc.hidden ? "pause" : "play"]();
		if (navigator.userActivation.hasBeenActive) music[doc.hidden ? "pause" : musicPlaying ? "play" : "pause"]();
	});
	window.addEventListener('blur', async e => {
		bod.classList.add("paused");
		video.pause();
		music.pause()
	});
	window.addEventListener('focus', async e => {
		bod.classList.remove("paused");
		video.play();
		if(musicPlaying && navigator.userActivation.hasBeenActive)music.play();
	});
	
	function goHome(){
		$(".screen.active").forEach(z=>z.classList.remove("active"));
		$$(".screen").classList.add("active");
		curScreen="home";
	}
	
	
	
	async function splitSpriteImage(url, segments=10, splitHeights=[]) {
		var image = await loadImage(url);
		
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var cum = 0;
		var blobUrls = [];

		canvas.width = image.width;
		if (segments>1){
			var segmentHeight = image.height / segments;
			canvas.height = segmentHeight;
		} else {
			canvas.height = splitHeights[0];
		}

		
		for (let i = 0; i < (segments>1 ? segments : splitHeights.length); i++) {
			if (segments>1){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(image, 0, -i * segmentHeight, image.width, image.height);
			} else {
				canvas = document.createElement('canvas');
				ctx = canvas.getContext('2d');
				canvas.width = image.width;
				canvas.height = splitHeights[i];
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(image, 0, -cum, image.width, image.height);
				cum += splitHeights[i];
			}
			var blob = await new Promise(resolve => canvas.toBlob(resolve));
			var blobUrl = URL.createObjectURL(blob);
			blobUrls.push(blobUrl);
		}

		return blobUrls;
	}

	// Helper function to load the image as a promise
	function loadImage(url) {
		return new Promise((resolve, reject) => {
			var img = new Image();
			img.crossOrigin = 'Anonymous'; // Necessary for cross-origin images
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = url;
		});
	}

	splitSpriteImage("assets/ui/campaign.jpg",10).then(urls=>{
		var uEls = [...$("#maps figure>.pad>.fImg")];
		urls.forEach((u,i)=>{
			uEls[i].style.setProperty("--bg","url("+u+")");
		});
	});
	splitSpriteImage("assets/ui/maps.jpg",1,[360,400,400,400,400,400,442,480,512,512,512,512,512]).then(urls=>{
		var uEls = [...$("#multiplayer figure>.pad>.fImg")];
		urls.forEach((u,i)=>{
			uEls[i].style.setProperty("--bg","url("+u+")");
		});
		//urls.forEach(z=>console.log(z));
	});
	
	window.addEventListener('keyup', async e => {
		if (!audioContext) loadAudio('/assets/ui/sounds.mp3').then(r=>audioContext=r);
		if (musicPlaying) music.play();
		if (curScreen==="home"){
			if ([].concat([],keys.UP,keys.DOWN).includes(e.code)){
				var act = $$(".menu>.active"), nxt = act.nextElementSibling || $$(".menu>a"), prev = act.previousElementSibling || $$(".menu>a:last-child");
				
				act.classList.remove("active");
				
				if (keys.DOWN.includes(e.code)) nxt.classList.add("active");
				else prev.classList.add("active");
				if (UISounds && audioContext) playSprite(audioContext, audioSprites.cursor.start, audioSprites.cursor.duration);
			} else if (keys.ENTER.includes(e.code)) {
				$$(".menu>.active").click();
				if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
			}
		} else if (curScreen==="maps"||curScreen==="multiplayer"){
			if ([].concat([],keys.RIGHT,keys.LEFT).includes(e.code)){
				var scC = $$("#"+curScreen),scW = $$(".window",scC);
				var act = $$(".window>.active",scW), nxt = act.nextElementSibling || $$("figure",scW), prev = act.previousElementSibling || $$("figure:last-child",scW);
				//nextScroll
				
				act.classList.remove("active");
				
				if (keys.RIGHT.includes(e.code)) {
					nxt.classList.add("active");
					if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
					$$("#nextScroll",scC).classList.add("active");
					setTimeout(()=>$$("#nextScroll",scC).classList.remove("active"),150);
				}
				else {
					prev.classList.add("active");
					if (UISounds && audioContext) playSprite(audioContext, audioSprites.back.start, audioSprites.back.duration);
					$$("#backScroll",scC).classList.add("active");
					setTimeout(()=>$$("#backScroll",scC).classList.remove("active"),150);
				}
				
				act = $$(".window>.active",scW);
				var sibs = [...act.parentElement.children],
					indx = sibs.indexOf(act);
				scW.style.setProperty("--page",Math.floor((indx)/3));
				
			} else if (keys.LEFTBUMP.includes(e.code)){
				var scC = $$("#"+curScreen);
				$$("#backScroll",scC).click();
				$$("#backScroll",scC).classList.add("active");
				setTimeout(()=>$$("#backScroll",scC).classList.remove("active"),150);
			} else if (keys.RIGHTBUMP.includes(e.code)){
				var scC = $$("#"+curScreen);
				$$("#nextScroll",scC).click();
				$$("#nextScroll",scC).classList.add("active");
				setTimeout(()=>$$("#nextScroll",scC).classList.remove("active"),150);
			} else if (keys.ENTER.includes(e.code)){
					if (UISounds && audioContext) playSprite(audioContext, audioSprites.fail.start, audioSprites.fail.duration);
			}
		} else if (curScreen==="settings"){
			if ([].concat([],keys.UP,keys.DOWN).includes(e.code)){
				var act = $$("#settings .options>.active"), nxt = act.nextElementSibling || $$("#settings .options>a"), prev = act.previousElementSibling || $$("#settings .options>a:last-child");
				
				act.classList.remove("active");
				
				if (keys.DOWN.includes(e.code)) nxt.classList.add("active");
				else prev.classList.add("active");
				
				act = $$("#settings .options>.active");
				$("#settings .preview>.active").forEach(a=>a.classList.remove("active"));
				$$("#settings .preview>[screen='"+act.getAttribute("screen")+"']").classList.add("active");
				if (UISounds && audioContext) playSprite(audioContext, audioSprites.cursor.start, audioSprites.cursor.duration);
				
			} else if (keys.ENTER.includes(e.code)){
				var scn = $$("#settings .preview>.active");
				scn.classList.add("full");
				lastScreen = curScreen;
				curScreen = scn.getAttribute("screen");
				$$("#settings h2").innerText = curScreen.toUpperCase();
				
				if(!$$(".active",scn)){var lbl = $$("label",scn);lbl.classList.add("active");lbl.parentElement.setAttribute("tooltip",lbl.getAttribute("tooltip"));}
				if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
			}
		} else if (lastScreen==="settings"){
			if ([].concat([],keys.UP,keys.DOWN).includes(e.code)){
				var scrn = $$("#settings .preview [screen="+curScreen+"]"), act = $$(".content>.active",scrn);
				act.classList.remove("active");
				var p=act.parentElement, sibs = [...$("label:not(.hidden)",p)], ind = sibs.indexOf(act);
				if (keys.DOWN.includes(e.code)){
					if (sibs[ind+1]) sibs[ind+1].classList.add("active");
					else sibs[0].classList.add("active");
				} else {
					if (ind===0) sibs[sibs.length-1].classList.add("active");
					else sibs[ind-1].classList.add("active");
				}
				//if (keys.DOWN.includes(e.code)) nxt.classList.add("active"); else prev.classList.add("active");
				if (UISounds && audioContext) playSprite(audioContext, audioSprites.cursor.start, audioSprites.cursor.duration);
				
				act.dispatchEvent(new Event("selected"))
				//console.log("key",act.getAttribute("tooltip"))
				
			} else if ([].concat([],keys.RIGHT,keys.LEFT).includes(e.code)){
				
				var scrn = $$("#settings .preview [screen="+curScreen+"]"), act = $$(".content>.active",scrn), sel = $$(".active>select", act);
				if (keys.RIGHT.includes(e.code)) {
					sel.selectedIndex = (sel.selectedIndex===(sel.length-1) ? 0 : sel.selectedIndex+1);
					$$(".btn.next",act).classList.add("active");
					setTimeout(()=>$$(".btn.next",act).classList.remove("active"),50);
				}
				else {
					sel.selectedIndex = (sel.selectedIndex===0 ? (sel.length-1) : sel.selectedIndex-1 );
					$$(".btn.prev",act).classList.add("active");
					setTimeout(()=>$$(".btn.prev",act).classList.remove("active"),50);
				}
				if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
				
				setTimeout(()=>requestIdleCallback(()=>sel.dispatchEvent(new Event("change"))),50);
				
			}  else if (keys.ENTER.includes(e.code)){
					if (UISounds && audioContext) playSprite(audioContext, audioSprites.fail.start, audioSprites.fail.duration);
			} else if (keys.ESCAPE.includes(e.code)){
				var scn = $$("#settings .preview>.active");
				scn.classList.remove("full");
				curScreen = lastScreen; lastScreen = "";
				$$("#settings h2").innerText = curScreen.toUpperCase();
				if (UISounds && audioContext) playSprite(audioContext, audioSprites.back.start, audioSprites.back.duration);
				return;
			}
			
		}
		if (keys.ESCAPE.includes(e.code)) {
			goHome();
			if (UISounds && audioContext) playSprite(audioContext, audioSprites.back.start, audioSprites.back.duration);
		}
	});
	var timeout;
	window.addEventListener('mousemove', async e => {
		var t = e.target, w = t.closest(".window");
		if (curScreen==="home" && t.matches(".menu>a")){
			$(".menu>a.active",w).forEach(a=>a.classList.remove("active"));
			t.classList.add("active");
		} else if (curScreen==="settings" && t.matches(".options>a")){
			if (!t.matches(".active")) $(".options>a.active,.preview>.active",w).forEach(a=>a.classList.remove("active"));
			clearTimeout(timeout);
			timeout = setTimeout(()=>{
				if (!t.matches(".active")) {if (UISounds && audioContext) playSprite(audioContext, audioSprites.back.start, audioSprites.back.duration);
				$$(".preview>[screen='"+t.getAttribute("screen")+"']",w).classList.add("active");
				t.classList.add("active");}
			});
		} else if (lastScreen==="settings" && t.matches(".content>label")){
			if (!t.matches(".active")) $(".content>.active",w).forEach(a=>a.classList.remove("active"));
			clearTimeout(timeout);
			timeout = setTimeout(()=>{
				if (!t.matches(".active")) {
					if (UISounds && audioContext) playSprite(audioContext, audioSprites.cursor.start, audioSprites.cursor.duration);
					t.parentElement.setAttribute("tooltip",t.getAttribute("tooltip"));
					t.classList.add("active");
				}
				//$$(".preview>[screen='"+t.getAttribute("screen")+"']",w).classList.add("active");
			});
		}
	});
	
	// MENU CLICKS
	window.addEventListener('click', async e => {
		if (!audioContext) loadAudio('/assets/ui/sounds.mp3').then(r=>audioContext=r);
		if (musicPlaying) music.play();
		var t = e.target;
		if (curScreen==="home" && t.matches("[screen]")){
			var screen = t.getAttribute("screen");
			curScreen=screen;
			$$(".screen.active").classList.remove("active");
			var trg = $$(".screen[screen='"+screen+"']");
			if (trg) trg.classList.add("active");
			if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
		} else if ((curScreen==="maps" || curScreen==="multiplayer") && t.matches(".pad,.pad *")){
			$(".active",t.closest(".window")).forEach(z=>z.classList.remove("active"));
			t.closest("figure").classList.add("active");
			if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
		} else if ((curScreen==="maps" || curScreen==="multiplayer") && t.matches(".screen>a#nextScroll")){
			var win = $$(".window",t.parentElement), cPg = +win.style.getPropertyValue("--page")||0,
				me = $$(".active",win), sibs = [...me.parentElement.children], ind=sibs.indexOf(me);
			me.classList.remove("active");
			if ((cPg)!==Math.floor(win.children.length/3)){win.style.setProperty("--page",cPg+1);(sibs[ind+3]||sibs[ind+2]||sibs[ind+1]).classList.add("active");}
			else {win.style.setProperty("--page",0);sibs[0].classList.add("active");}
			if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
		}  else if ((curScreen==="maps" || curScreen==="multiplayer") && t.matches(".screen>a#backScroll")){
			var win = $$(".window",t.parentElement), cPg = +win.style.getPropertyValue("--page")||0,
				me = $$(".active",win), sibs = [...me.parentElement.children], ind=sibs.indexOf(me);
			me.classList.remove("active");
			if ((cPg)===0){win.style.setProperty("--page",Math.floor(win.children.length/3));sibs[win.children.length-1].classList.add("active");}
			else {win.style.setProperty("--page",cPg-1);(sibs[ind-3]||sibs[ind-2]||sibs[ind-1]).classList.add("active");}
			if (UISounds && audioContext) playSprite(audioContext, audioSprites.back.start, audioSprites.back.duration);
		} else if (curScreen==="settings" && t.matches(".options>a")){
			var ful = $$(".preview>[screen='"+t.getAttribute("screen")+"']",t.closest(".window"));
			ful.classList.add("full");
			lastScreen = curScreen;
			curScreen = t.getAttribute("screen");
			$$("#settings h2").innerText = curScreen.toUpperCase();
			if(!$$(".active",ful)){var lbl = $$("label",ful);lbl.classList.add("active");lbl.parentElement.setAttribute("tooltip",lbl.getAttribute("tooltip"));}
			if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
		} else if (lastScreen==="settings" && t.matches(".btn")){
			var sel = t.parentElement.querySelector("select"),sI = sel.selectedIndex, max = sel.length-1;
			
			if (t.matches(".next")) sel.selectedIndex = (sel.selectedIndex===max ? 0 : sI+1);
			else sel.selectedIndex = (sel.selectedIndex===0 ? max : sI-1);
			
			if (UISounds && audioContext) playSprite(audioContext, audioSprites.fwd.start, audioSprites.fwd.duration);
			
			requestIdleCallback(()=>sel.dispatchEvent(new Event("change")));
		}
	});
	
	window.addEventListener('contextmenu', async e => {
		e.preventDefault();
		if (lastScreen==="settings"){
			var scn = $$("#settings .preview>.active");
			scn.classList.remove("full");
			curScreen = lastScreen; lastScreen = "";
			$$("#settings h2").innerText = curScreen.toUpperCase();
		} else goHome();
		if (UISounds && audioContext) playSprite(audioContext, audioSprites.back.start, audioSprites.back.duration);
	});
	
	var uSettings = location.hash.slice(1), selects = [...$("#settings select")];
	if (uSettings.length===selects.length){
		var spl = uSettings.split("");
		spl.forEach((s,i)=>{
			selects[i].selectedIndex=+s;
			selects[i].dispatchEvent(new Event("change"));
		});
		
	}
	
	
});