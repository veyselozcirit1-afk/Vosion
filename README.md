# upVirüS — Web Sitesi

BoxPvP, BoxMining, Skyblock ve KitPvP modlarını tanıtan, mobil ve PC'de tam uyumlu, canlı sunucu durumu gösteren tek sayfalık site.

Saf HTML/CSS/JS — build adımı yok, direkt yayınlanır.

## Dosyalar
- `index.html`
- `styles.css`
- `script.js`

## Değiştirmen gereken tek yer
`script.js` dosyasının en üstünde:
```js
const DISCORD_URL = "#"; // buraya kendi Discord davet linkini yaz
```

Sunucu adresi zaten `play.upvirus.net` olarak ayarlı. Değişirse aynı dosyada `SERVER_HOST` değerini güncelle.

## Termux'ta GitHub'a yükleme
```
cd upvirus
git init
git add .
git commit -m "upVirüS sitesi"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/upvirus.git
git push -u origin main
```

## Vercel'e deploy (en kolay yol)
1. vercel.com → **Add New Project**
2. GitHub repounu seç (`upvirus`)
3. Framework: **Other** / **Static** seç — build ayarı gerekmiyor
4. **Deploy** de, 30 saniyede yayında.

Her `git push` sonrası Vercel otomatik güncelleyecek.

## Alternatif: GitHub Pages
Repo → **Settings → Pages → Branch: main / (root)** → Save. Birkaç dakikada `KULLANICI_ADIN.github.io/upvirus` üzerinden yayında.

## Canlı sunucu durumu nasıl çalışıyor?
Sağ üstteki HUD paneli `api.mcsrvstat.us` üzerinden `play.upvirus.net` adresini sorgular, oyuncu sayısı/sürüm/MOTD'yi gerçek zamanlı gösterir. Ekstra kurulum gerekmez, tamamen client-side.

