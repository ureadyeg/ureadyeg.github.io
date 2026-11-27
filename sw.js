// UReady service worker: caches static libs and fonts for fast launch. Pages always come from the network first.
var V='ur-v2';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(V).then(function(c){return c.add('/supabase.min.js')}).catch(function(){}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);
 var stat=(u.origin===location.origin&&u.pathname==='/supabase.min.js')||u.hostname==='fonts.gstatic.com'||u.hostname==='fonts.googleapis.com';
 if(stat){e.respondWith(caches.open(V).then(function(c){return c.match(r).then(function(h){var n=fetch(r).then(function(x){if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(function(){return h});return h||n})}));return}
 if(r.mode==='navigate'&&u.origin===location.origin){e.respondWith(fetch(r).then(function(x){var y=x.clone();caches.open(V).then(function(c){c.put('/index.html',y)});return x}).catch(function(){return caches.match('/index.html')}))}
});
