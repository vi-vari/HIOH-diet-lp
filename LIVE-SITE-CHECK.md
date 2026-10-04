# LIVE-SITE-CHECK

公開サイト https://vi-vari.github.io/HIOH-diet-lp/ の「画像が全部表示されない」報告について、
外部から取得を試みた生の記録。結論・考察は含まない。

- 実施日時 (UTC): 2026-10-04 08:29:11 UTC
- 実施環境: Claude Code クラウドコンテナ（外向き HTTPS はエージェントプロキシ経由）
- 使用ツール: Bash / Read / Write のみ

## 手順0. ネットワーク疎通

```
$ curl -sS -o /dev/null -w "github.io %{http_code}\n" --max-time 20 -I https://vi-vari.github.io/HIOH-diet-lp/
curl: (56) CONNECT tunnel failed, response 403
github.io 000
$ curl -sS -o /dev/null -w "github.com %{http_code}\n" --max-time 20 -I https://github.com/
github.com 400
```

github.io は `http_code 000`（`curl: (56) CONNECT tunnel failed, response 403`）。
→ **この環境からも到達不可**。手順1〜3（live index.html 取得・画像37種取得・live と main の sha256 比較）はスキップ。

## 手順1. index.html の取得

スキップ（手順0で github.io に到達不可）。`/tmp/check/headers.txt`、`/tmp/check/live-index.html` は未取得。

## 手順2. 画像37種類の取得

スキップ（手順0で github.io に到達不可）。`/tmp/check/img/` は空。

## 手順3. リポジトリ main との比較

live 側が取得できないため live.sha との diff は実施不可。
代わりに、リポジトリ側（`origin/main` と、clone 時の HEAD）の事実のみを記録する。

### 3-a. clone

```
$ git clone --depth 1 https://github.com/vi-vari/HIOH-diet-lp /tmp/check/repo
Cloning into '/tmp/check/repo'...
exit=0
```

clone 直後の HEAD はリポジトリのデフォルトブランチ `claude/hioh-diet-lp-responsive-1plq6a`（5f25d5e）で、`main` ではなかった。

### 3-b. clone 時 HEAD（claude/hioh-diet-lp-responsive-1plq6a @ 5f25d5e）の内容

```
$ git log --oneline -1
5f25d5e Implement HIOH diet LP from Figma design (responsive)

$ ls -la images/
total 12
drwxr-xr-x 2 root root 4096 Oct  4 08:27 .
drwxr-xr-x 6 root root 4096 Oct  4 08:27 ..
-rw-r--r-- 1 root root  134 Oct  4 08:27 README.md

$ find images -type f | sort
images/README.md

$ find images -type f | wc -l
1

$ grep -oE 'src="[^"]+"' index.html | sort | uniq -c
      1 src="images/01-header-cta.png"
      1 src="images/02-fv.png"
      1 src="images/03-fv-under.png"
      1 src="images/04-cta-banner.png"
      1 src="images/05-over40-01.png"
      1 src="images/06-over40-02.png"
      1 src="images/07-worry-01.png"
      1 src="images/08-worry-02.png"
      1 src="images/09-worry-rank.png"
      1 src="images/10-diet-worry.png"
      1 src="images/11-treatment.png"
      1 src="images/12-diet-truth.png"
      1 src="images/13-ba-01.png"
      1 src="images/14-ba-02.png"
      1 src="images/15-ba-03.png"
      1 src="images/16-exercise-01.png"
      1 src="images/17-body-care.png"
      1 src="images/18-success-rate.png"
      1 src="images/19-reason-01.png"
      1 src="images/20-reason-02.png"
      1 src="images/21-reason-03.png"
      1 src="images/22-reason-04.png"
      1 src="images/23-reason-05.png"
      1 src="images/24-flow-01.png"
      1 src="images/25-flow-02.png"
      1 src="images/26-message-01.png"
      1 src="images/27-faq-01.png"
      1 src="images/28-faq-02.png"
      1 src="images/29-shop-01.png"
      1 src="images/30-shop-map.png"
      1 src="images/31-shop-02.png"
      1 src="images/32-closing.png"
      1 src="images/33-message-02.png"
      5 src="images/cta-bottom.png"
      5 src="images/cta-btn-01.png"
      5 src="images/cta-btn-02.png"
      5 src="images/cta-main.png"
      1 src="js/script.js"

$ grep -oE 'src="images/[^"]+"' index.html | sort -u | wc -l
37

$ grep -oE 'url\([^)]+\)' css/*.css index.html | sort | uniq -c

$ sha256sum index.html
bfc400081942b4c88309b4a31b9f252e5de25e65b8cbff6b510b6f122fe6bb29  index.html

$ git branch -r
  origin/HEAD -> origin/claude/hioh-diet-lp-responsive-1plq6a
  origin/claude/hioh-diet-lp-responsive-1plq6a

$ cat images/README.md
# デザイン画像をこのフォルダに配置してください。ファイル名とサイズは README.md の一覧を参照。

$ cat .gitignore
cat: .gitignore: No such file or directory

$ git ls-remote --heads origin
103801f3ff557648ebbf7ff9d292f0c89d00097c	refs/heads/claude/figma-design-images-xhckmw
5f25d5eb6437e98a856f667625eabd6490bd36af	refs/heads/claude/hioh-diet-lp-responsive-1plq6a
103801f3ff557648ebbf7ff9d292f0c89d00097c	refs/heads/main

$ git ls-remote origin HEAD
5f25d5eb6437e98a856f667625eabd6490bd36af	HEAD

$ ls -la
total 52
drwxr-xr-x 6 root root  4096 Oct  4 08:27 .
drwxr-xr-x 4 root root  4096 Oct  4 08:28 ..
drwxr-xr-x 8 root root  4096 Oct  4 08:27 .git
-rw-r--r-- 1 root root     0 Oct  4 08:27 .nojekyll
-rw-r--r-- 1 root root  5925 Oct  4 08:27 README.md
drwxr-xr-x 2 root root  4096 Oct  4 08:27 css
drwxr-xr-x 2 root root  4096 Oct  4 08:27 images
-rw-r--r-- 1 root root 18497 Oct  4 08:27 index.html
drwxr-xr-x 2 root root  4096 Oct  4 08:27 js

$ ls -la css js
css:
total 12
drwxr-xr-x 2 root root 4096 Oct  4 08:27 .
drwxr-xr-x 6 root root 4096 Oct  4 08:27 ..
-rw-r--r-- 1 root root 3820 Oct  4 08:27 style.css

js:
total 12
drwxr-xr-x 2 root root 4096 Oct  4 08:27 .
drwxr-xr-x 6 root root 4096 Oct  4 08:27 ..
-rw-r--r-- 1 root root 1013 Oct  4 08:27 script.js

$ cat README.md
# HIOH personal GYM ダイエットLP

Figma デザイン [`LP / Main`（node 676:2）](https://www.figma.com/design/Nd86bU4YvLSdwvI1IjcYkD/LP?node-id=676-2)
をそのまま実装した静的LPです。素の HTML / CSS / JavaScript のみで動きます。

```
index.html        LP本体（セクション構成・テキスト）
css/style.css     レイアウトとレスポンシブ指定
js/script.js      CTAリンク先の一括設定
images/           デザイン画像（768px幅）
```

## レスポンシブの考え方

デザインは幅 768px の1カラム構成です。

- **768px 以上**：カラムを 768px 幅で中央寄せし、左右は白地（Figma の Background と同じ）
- **768px 未満**：カラム全体が画面幅いっぱいに縮小。画像は `width:100%; height:auto` で
  縦横比を保ったまま追従します
- テキスト部分（代表あいさつ／最後のメッセージ）は画像ではなく実テキストなので、
  `clamp()` で 768px 時にデザイン値（24px / 36px）、狭い画面では読みやすい下限
  （15px / 17px）になるよう調整しています

各 `<img>` には `width` / `height` 属性を入れてあるため、画像の読み込み前でも
高さが確保され、レイアウトのガタつき（CLS）が起きません。

## 画像の配置

`images/` に下記のファイル名で、**幅 768px**（Retina対応するなら 1536px でも可。
縦横比が同じであれば表示は変わりません）の画像を置いてください。
サイズは Figma 上の実寸です。

| # | ファイル名 | サイズ (px) | Figma レイヤー |
|---|---|---|---|
| 1 | `01-header-cta.png` | 768 × 114 | FV_CTA 1 |
| 2 | `02-fv.png` | 768 × 748 | LP_FVデザイン 1 |
| 3 | `03-fv-under.png` | 768 × 847 | FV直下デザイン 768×847 |
| 4 | `04-cta-banner.png` | 768 × 274 | 1 922（リンク） |
| 5 | `05-over40-01.png` | 768 × 1042 | 40才を超えてから_01 |
| 6 | `06-over40-02.png` | 768 × 1139 | 40才を超えてから_02 |
| 7 | `07-worry-01.png` | 768 × 1346 | お悩み_01 |
| 8 | `08-worry-02.png` | 768 × 1166 | お悩み_02 |
| 9 | `09-worry-rank.png` | 768 × 1100 | お悩みランキング |
| 10 | `10-diet-worry.png` | 768 × 665 | ダイエットお悩み |
| 11 | `11-treatment.png` | 768 × 1463 | 当院の施術 768×1463 |
| 12 | `12-diet-truth.png` | 768 × 1405 | ダイエットのこと 768×1404 |
| 13 | `13-ba-01.png` | 768 × 1224 | ビフォーアフ-MY4_01 |
| 14 | `14-ba-02.png` | 768 × 1430 | BA_MY4_02 |
| 15 | `15-ba-03.png` | 768 × 1497 | ビフォーアフ-MY4_03 |
| 16 | `16-exercise-01.png` | 768 × 758 | 運動は苦手・・・_01 |
| 17 | `17-body-care.png` | 768 × 1209 | 体を整えて 768×1209 |
| 18 | `18-success-rate.png` | 768 × 512 | 成功率91% 768×511 |
| 19 | `19-reason-01.png` | 768 × 1218 | 痩せられる理由1 768×1218 |
| 20 | `20-reason-02.png` | 768 × 1261 | 痩せられる理由3 768×1260 |
| 21 | `21-reason-03.png` | 768 × 1304 | 7つの理由_MY4_003 |
| 22 | `22-reason-04.png` | 768 × 1449 | 7つの理由_MY4_04 |
| 23 | `23-reason-05.png` | 768 × 1464 | 痩せられる理由7 768×1464 |
| 24 | `24-flow-01.png` | 768 × 1118 | 申込後の流れ_MY4_01 |
| 25 | `25-flow-02.png` | 768 × 1172 | 申込後の流れ_MY4_02 |
| 26 | `26-message-01.png` | 768 × 657 | 代表の想い 768×1519（上部） |
| 27 | `27-faq-01.png` | 768 × 1085 | よくある質問_MY4_01 |
| 28 | `28-faq-02.png` | 768 × 991 | よくある質問_MY4_02 |
| 29 | `29-shop-01.png` | 768 × 438 | 店舗情報１ |
| 30 | `30-shop-map.png` | 768 × 512 | スクリーンショット（地図） |
| 31 | `31-shop-02.png` | 768 × 578 | 店舗情報２ |
| 32 | `32-closing.png` | 768 × 457 | ここまで・・・MY4_001 |
| 33 | `33-message-02.png` | 768 × 657 | 代表の想い 768×1519（下部） |

### CTAブロック（ページ内で5回くり返し）

| ファイル名 | サイズ (px) | Figma レイヤー |
|---|---|---|
| `cta-main.png` | 768 × 1299 | 2,980 768×1299 |
| `cta-btn-01.png` | 768 × 274 | 2 5（リンク） |
| `cta-btn-02.png` | 768 × 274 | 3 1（リンク） |
| `cta-bottom.png` | 768 × 695 | CTA_ 744×673 |

CTAブロックは「ファーストビュー直後 / 施術説明の後 / ビフォーアフターの後 /
申込後の流れの後 / ページ最下部」の計5か所に入っています。

## CTAのリンク先を設定する

`js/script.js` の先頭にある `CTA_URL` に、申込みフォームまたは LINE 公式アカウントの
URLを入れてください。ページ内すべてのCTA（`class="js-cta"`）にまとめて反映されます。

```js
var CTA_URL = 'https://lin.ee/xxxxxxx';
```

未設定（空文字）の場合、CTAはクリックしても遷移しません（誤クリック防止）。

## セクション構成

1. ヘッダーCTAバー
2. ファーストビュー ＋ 初回体験の案内 ＋ CTAバナー
3. 40才を超えてから痩せにくくなった方へ
4. **CTAブロック①**
5. こんなお悩みはありませんか（お悩み／ランキング）
6. 当ジムの施術・ダイエットの本当のこと
7. **CTAブロック②**
8. ビフォーアフター実績
9. **CTAブロック③**
10. 運動が苦手な方へ／体を整えて痩せる／成功率91%
11. 痩せられる理由（5ブロック）
12. お申し込み後の流れ
13. **CTAブロック④**
14. 代表の想い（画像＋あいさつ文）
15. よくある質問
16. 店舗情報・アクセス
17. 最後に（締めのメッセージ）
18. **CTAブロック⑤**
19. フッター

## 公開（GitHub Pages）

リポジトリの Settings → Pages で、Branch を `main`（フォルダは `/root`）に設定すると
そのまま公開されます。`.nojekyll` を置いてあるので、Jekyll による処理は行われません。
```

### 3-c. origin/main（103801f）の内容

```
$ git fetch --depth 1 origin main:refs/remotes/origin/main
From https://github.com/vi-vari/HIOH-diet-lp
 * [new branch]      main       -> origin/main
exit=0

$ git log --format="%H %ad %s" --date=iso -1 origin/main
103801f3ff557648ebbf7ff9d292f0c89d00097c 2026-09-14 03:47:58 +0000 Swap in corrected 25-flow-02 and 23-reason-05 artwork

$ git ls-tree -r -l origin/main
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391       0	.nojekyll
100644 blob e9c0daff07df9fed136ba9153e9ad0727ffce6f8    6614	README.md
100644 blob cc4f4477ce93739558cee223ff73ac279bd070c7    3820	css/style.css
100644 blob 0edde4422c29e74b56c1295608790eccaeb8de29   37209	images/01-header-cta.png
100644 blob 7f9f845f2ed4020931897d21e4927e7997dd8a5a  486499	images/02-fv.png
100644 blob d97d4e9e04277e2ccd6a2ef061da428867c6f001  470011	images/03-fv-under.png
100644 blob 073e2c80fae01ad7a3b968d0d653c5375fd9d53f  104204	images/04-cta-banner.png
100644 blob 6a44399f0cb1c5ae458c180e0321a7cd1bb4a6d2  564373	images/05-over40-01.png
100644 blob 3d81cb1b7575fc93d8fa820284f5f66b453a5708  847471	images/06-over40-02.png
100644 blob 962ce008fab3c8351726daeda43e27945fde1271  782604	images/07-worry-01.png
100644 blob a06b3b953702523fd5fa513e4311994e26e24f77  901714	images/08-worry-02.png
100644 blob 4743c80d3382c6241bc082807f60d2decdcbb0a8  626372	images/09-worry-rank.png
100644 blob 7c6222724e67fb2d2a8ce9d57ae1e4eff0081607  397399	images/10-diet-worry.png
100644 blob b28a8df7fc7eef1307640899f76eaf0fb0e7b15c  780778	images/11-treatment.png
100644 blob 231a8e3c362380abcd23755bc36efe131c5171bc  615534	images/12-diet-truth.png
100644 blob 358a8ec1e10d9b6efb923280a14ffd4899d02fa5  721413	images/13-ba-01.png
100644 blob 5f5b8859bfb58725730c83588454b35d4153274a 1068312	images/14-ba-02.png
100644 blob 7819df68f0d1915739731e0900f548b4b9dee9b4 1010003	images/15-ba-03.png
100644 blob 649889788cd206273542d1425fa2577424d7f50a  176502	images/16-exercise-01.png
100644 blob 242054c02d5b3ce34faf1ab3491c246c75c27d6d  930734	images/17-body-care.png
100644 blob 2be5db88e6f827bbf2245365368a5431234fd794  195139	images/18-success-rate.png
100644 blob 8e8b802f47ae21efa2712bcd6b028126c282ea44  692807	images/19-reason-01.png
100644 blob d0d70dc68ea91372939dc6dbd7bbdde92097edbf  658279	images/20-reason-02.png
100644 blob 70b9d0a142fd3a70e4b4fbe9eec4e1c3aa72df93  647985	images/21-reason-03.png
100644 blob 7d4154dcbbdb17341c2ef188cb87ddcb163045d3  896765	images/22-reason-04.png
100644 blob 330854c5c5d00e6a7bbb23322c64377162f43e86  841203	images/23-reason-05.png
100644 blob 738e4ffb2a65689e782c665702c4a7a26e434750  457444	images/24-flow-01.png
100644 blob 87f65904f5c23ae956bd7ec3fee60f9905d7adea  331028	images/25-flow-02.png
100644 blob 48aad975b29ac6559cfd8df0a50a90a74c06de22  387058	images/26-message-01.png
100644 blob 2e7887a1412dff4e7bcc73ee340b9ec628dcf172  368323	images/27-faq-01.png
100644 blob 8f7d2a3a0ce6de4b4cbba4cf8c8182a24a7ac530  254783	images/28-faq-02.png
100644 blob 4a4b5816796186e04b4486558a9dd0ffa2762ab6   54313	images/29-shop-01.png
100644 blob 767920477bbd583b9168c264530f46d358981e00  532747	images/30-shop-map.png
100644 blob 5fd683ecc0b2fd2499eae20384dfd8bf1d30efd0  121403	images/31-shop-02.png
100644 blob 768801175e11861857278306595b49a2d2383736  111534	images/32-closing.png
100644 blob 6b79f052a4b5395d48d97848f8108c2851b499f0  274757	images/33-message-02.png
100644 blob 1d154c7a9fc4d706185ff907228698a72acd6df5     134	images/README.md
100644 blob 69474d5b25269694cee9f9228b3d7ab2b6f71a72  194815	images/cta-bottom.png
100644 blob e8340034100bc0d4ea0a5ee99fb2554c31f5c24a   92534	images/cta-btn-01.png
100644 blob 07d1f0cbb5acf6d81555f466a851012015acde25  111384	images/cta-btn-02.png
100644 blob f7088d5e9476f61c52e7e4f6419088b4166c1e23  676753	images/cta-main.png
100644 blob 79de8afd9c0659eb526552c4d9470eef39b0be5a   19149	index.html
100644 blob 8461af09c8661e7a74284b77f0a8fb382d15a6d7    2234	js/script.js

$ git ls-tree -r --name-only origin/main images/ | wc -l
38

$ git show origin/main:index.html | sha256sum
9cf1c18c295c460d59b9f5d7472c2cf9b4ea68abcd171e0b19f567ed630f5406  -

$ git show origin/main:index.html | grep -oE 'src="images/[^"]+"' | sort | uniq -c
      1 src="images/01-header-cta.png"
      1 src="images/02-fv.png"
      1 src="images/03-fv-under.png"
      1 src="images/04-cta-banner.png"
      1 src="images/05-over40-01.png"
      1 src="images/06-over40-02.png"
      1 src="images/07-worry-01.png"
      1 src="images/08-worry-02.png"
      1 src="images/09-worry-rank.png"
      1 src="images/10-diet-worry.png"
      1 src="images/11-treatment.png"
      1 src="images/12-diet-truth.png"
      1 src="images/13-ba-01.png"
      1 src="images/14-ba-02.png"
      1 src="images/15-ba-03.png"
      1 src="images/16-exercise-01.png"
      1 src="images/17-body-care.png"
      1 src="images/18-success-rate.png"
      1 src="images/19-reason-01.png"
      1 src="images/20-reason-02.png"
      1 src="images/21-reason-03.png"
      1 src="images/22-reason-04.png"
      1 src="images/23-reason-05.png"
      1 src="images/24-flow-01.png"
      1 src="images/25-flow-02.png"
      1 src="images/26-message-01.png"
      1 src="images/27-faq-01.png"
      1 src="images/28-faq-02.png"
      1 src="images/29-shop-01.png"
      1 src="images/30-shop-map.png"
      1 src="images/31-shop-02.png"
      1 src="images/32-closing.png"
      1 src="images/33-message-02.png"
      5 src="images/cta-bottom.png"
      5 src="images/cta-btn-01.png"
      5 src="images/cta-btn-02.png"
      5 src="images/cta-main.png"

$ git show origin/main:index.html | grep -oE 'src="images/[^"]+"' | sort -u | wc -l
37

$ git diff --stat 5f25d5e origin/main
 README.md                  |  38 ++++++++++++++++++-----------
 images/01-header-cta.png   | Bin 0 -> 37209 bytes
 images/02-fv.png           | Bin 0 -> 486499 bytes
 images/03-fv-under.png     | Bin 0 -> 470011 bytes
 images/04-cta-banner.png   | Bin 0 -> 104204 bytes
 images/05-over40-01.png    | Bin 0 -> 564373 bytes
 images/06-over40-02.png    | Bin 0 -> 847471 bytes
 images/07-worry-01.png     | Bin 0 -> 782604 bytes
 images/08-worry-02.png     | Bin 0 -> 901714 bytes
 images/09-worry-rank.png   | Bin 0 -> 626372 bytes
 images/10-diet-worry.png   | Bin 0 -> 397399 bytes
 images/11-treatment.png    | Bin 0 -> 780778 bytes
 images/12-diet-truth.png   | Bin 0 -> 615534 bytes
 images/13-ba-01.png        | Bin 0 -> 721413 bytes
 images/14-ba-02.png        | Bin 0 -> 1068312 bytes
 images/15-ba-03.png        | Bin 0 -> 1010003 bytes
 images/16-exercise-01.png  | Bin 0 -> 176502 bytes
 images/17-body-care.png    | Bin 0 -> 930734 bytes
 images/18-success-rate.png | Bin 0 -> 195139 bytes
 images/19-reason-01.png    | Bin 0 -> 692807 bytes
 images/20-reason-02.png    | Bin 0 -> 658279 bytes
 images/21-reason-03.png    | Bin 0 -> 647985 bytes
 images/22-reason-04.png    | Bin 0 -> 896765 bytes
 images/23-reason-05.png    | Bin 0 -> 841203 bytes
 images/24-flow-01.png      | Bin 0 -> 457444 bytes
 images/25-flow-02.png      | Bin 0 -> 331028 bytes
 images/26-message-01.png   | Bin 0 -> 387058 bytes
 images/27-faq-01.png       | Bin 0 -> 368323 bytes
 images/28-faq-02.png       | Bin 0 -> 254783 bytes
 images/29-shop-01.png      | Bin 0 -> 54313 bytes
 images/30-shop-map.png     | Bin 0 -> 532747 bytes
 images/31-shop-02.png      | Bin 0 -> 121403 bytes
 images/32-closing.png      | Bin 0 -> 111534 bytes
 images/33-message-02.png   | Bin 0 -> 274757 bytes
 images/cta-bottom.png      | Bin 0 -> 194815 bytes
 images/cta-btn-01.png      | Bin 0 -> 92534 bytes
 images/cta-btn-02.png      | Bin 0 -> 111384 bytes
 images/cta-main.png        | Bin 0 -> 676753 bytes
 index.html                 |  52 +++++++++++++++++++++-------------------
 js/script.js               |  58 +++++++++++++++++++++++++++++++++++----------
 40 files changed, 97 insertions(+), 51 deletions(-)
```

### 3-d. origin/main の images/*.png の file 判定と sha256

```
$ file /tmp/check/main-img/*.png
01-header-cta.png:   PNG image data, 768 x 114, 8-bit/color RGBA, non-interlaced
02-fv.png:           PNG image data, 768 x 753, 8-bit/color RGB, non-interlaced
03-fv-under.png:     PNG image data, 768 x 848, 8-bit/color RGBA, non-interlaced
04-cta-banner.png:   PNG image data, 768 x 268, 8-bit/color RGBA, non-interlaced
05-over40-01.png:    PNG image data, 768 x 1042, 8-bit/color RGBA, non-interlaced
06-over40-02.png:    PNG image data, 768 x 1140, 8-bit/color RGBA, non-interlaced
07-worry-01.png:     PNG image data, 768 x 1346, 8-bit/color RGBA, non-interlaced
08-worry-02.png:     PNG image data, 768 x 1167, 8-bit/color RGBA, non-interlaced
09-worry-rank.png:   PNG image data, 768 x 1100, 8-bit/color RGBA, non-interlaced
10-diet-worry.png:   PNG image data, 768 x 665, 8-bit/color RGBA, non-interlaced
11-treatment.png:    PNG image data, 768 x 1463, 8-bit/color RGB, non-interlaced
12-diet-truth.png:   PNG image data, 768 x 1404, 8-bit/color RGB, non-interlaced
13-ba-01.png:        PNG image data, 768 x 1224, 8-bit/color RGBA, non-interlaced
14-ba-02.png:        PNG image data, 768 x 1430, 8-bit/color RGBA, non-interlaced
15-ba-03.png:        PNG image data, 768 x 1497, 8-bit/color RGBA, non-interlaced
16-exercise-01.png:  PNG image data, 768 x 759, 8-bit/color RGBA, non-interlaced
17-body-care.png:    PNG image data, 768 x 1209, 8-bit/color RGBA, non-interlaced
18-success-rate.png: PNG image data, 768 x 512, 8-bit/color RGBA, non-interlaced
19-reason-01.png:    PNG image data, 768 x 1218, 8-bit/color RGB, non-interlaced
20-reason-02.png:    PNG image data, 768 x 1260, 8-bit/color RGB, non-interlaced
21-reason-03.png:    PNG image data, 768 x 1260, 8-bit/color RGB, non-interlaced
22-reason-04.png:    PNG image data, 768 x 1449, 8-bit/color RGBA, non-interlaced
23-reason-05.png:    PNG image data, 768 x 1464, 8-bit/color RGB, non-interlaced
24-flow-01.png:      PNG image data, 768 x 1118, 8-bit/color RGBA, non-interlaced
25-flow-02.png:      PNG image data, 768 x 1172, 8-bit/color RGB, non-interlaced
26-message-01.png:   PNG image data, 768 x 657, 8-bit/color RGBA, non-interlaced
27-faq-01.png:       PNG image data, 768 x 1085, 8-bit/color RGBA, non-interlaced
28-faq-02.png:       PNG image data, 768 x 991, 8-bit/color RGBA, non-interlaced
29-shop-01.png:      PNG image data, 768 x 438, 8-bit/color RGB, non-interlaced
30-shop-map.png:     PNG image data, 768 x 512, 8-bit/color RGBA, non-interlaced
31-shop-02.png:      PNG image data, 768 x 578, 8-bit/color RGB, non-interlaced
32-closing.png:      PNG image data, 768 x 457, 8-bit/color RGBA, non-interlaced
33-message-02.png:   PNG image data, 768 x 657, 8-bit/color RGBA, non-interlaced
cta-bottom.png:      PNG image data, 768 x 695, 8-bit/color RGBA, non-interlaced
cta-btn-01.png:      PNG image data, 768 x 274, 8-bit/color RGBA, non-interlaced
cta-btn-02.png:      PNG image data, 768 x 274, 8-bit/color RGBA, non-interlaced
cta-main.png:        PNG image data, 768 x 1299, 8-bit/color RGB, non-interlaced

$ sha256sum /tmp/check/main-img/*.png
03696bb203fadc65457a7e5bc1c50e13d5357cf7290c154d061cede45eae4943  04-cta-banner.png
0a3a2465b30594dfd7307e4d3c42b7f56d10d3cf36bb708cf7b092666b911cd1  06-over40-02.png
145f17be9a5a61a0acc2e1dc1e2b955df7bdde39d9a0d8f1f53ff37ee4590e78  14-ba-02.png
18c9fe2f15a34698b1e620f3c0c71c1d9579a92794ce5708e99389b3d68a966b  12-diet-truth.png
1b1913f44b336bb74fb87ad765b32585650ee689f2fc0ed65fb439139f718d6a  16-exercise-01.png
1b5946e67387553b30399ada168cf2e1fcb977e05f47e880dab1ffff9f46ed41  27-faq-01.png
1f00bf498b73796d5f1d579a8ab64804984d39ea4a856af7a7118e1e9b9d4b59  07-worry-01.png
262dab5a0ce45c815a6976d12317b94fcd3cbae7c883e5331003afd7325986c9  15-ba-03.png
2b72eb5866fd665df8e4e7078549ee49df3a0959b5212d9ba89ee06d4f1f6ff3  30-shop-map.png
33b001a43b9a05dcf16c84ce773a92ffbbfbef783d215fe58527b75c1eb6ab71  03-fv-under.png
360cc9562a658ea808a2da9541b7eaa5ea0031f298b28350bb74e77a542cbe69  cta-btn-01.png
3b394c0db9c9188d57c4c2441e917066889cd1522a4950a2e6410a651f7e7b2d  26-message-01.png
42f257b1e37c184db77b8971a576323bfbb275bbb302c27157db8ff08f505932  08-worry-02.png
4d4ba7f0cfd24ab2e0de738f59dd76450c88f408597f433f99cc06899a10a31d  24-flow-01.png
578b242abaa1fced31995703f070ebeaf11d911a6b10234050f0d0f5cf051de9  28-faq-02.png
5d5ae591117ae4402a328be264518889b6e1c27e22ad35a9d4c51fcb5bfce76f  11-treatment.png
5fdb55827c0285bb5d6720583d6054bb82a6959c13faba4587c8ccd9a696d2b0  19-reason-01.png
615b602b607f3d93b1936e83564e5252d6b243ce1d8cd1f9b744fe4fee8a4f45  31-shop-02.png
6333d3beb32d29e0d97de80d8c37d57c04abe559bd7dcb9d623071dd77a7e3aa  33-message-02.png
68f25d39209cf9f42435cdcd955adc43d76df5d999fb77f18c3bb90555c1466e  05-over40-01.png
756160a7f3cb51fffc0cd4bd968f103a38bf2610358d3fa509e2f98ea06b9faa  32-closing.png
8069fc732fb6a8a6eb03e9120dc39becc6443ac4f62044c8e3afc0e3bd042df6  13-ba-01.png
812b3e1bd39ae631704c3dd33d054f478b2faa45e3b902cb5787ee77b2a9100d  20-reason-02.png
8634bdbcd2ac219b5be43780a968d167e4a2e9cd545142f16661f2d517ded5a3  21-reason-03.png
8afd1288c1e18a017150b68b3c050bebcc089d6c219d79d9210992de72ae6323  cta-btn-02.png
918f448d6f6f85b21c69cb2b7c3b00c66d9fdcffe8b537eb7c81e38ea6de2719  25-flow-02.png
a265fe324210b937f1d191b572b041f1f5559d72a4e183b2c0f176447889bb1c  cta-bottom.png
b7768878bd4459a2e4240f0119b9c6006b3234f938596f9dc7a4d8a17c84c676  09-worry-rank.png
ba2787c28d5d0b56b00d55239e0597605b1aa2eef562fb9e08a1c0305e7a6b8c  29-shop-01.png
c84df2df95d0973509d7b7e942ac0c9c5f74cfc9037b5547b4019d9b991577f5  01-header-cta.png
c8a242f46d11b162fe89e190e80bd1d2f93d783dc68e513a8c3cad839b29baab  cta-main.png
d0e0e7b3bf4d5ee81f72b81a97e769577f552a361bc06e7f8454786c247be03b  10-diet-worry.png
d2ccac5db3af6e67b10ebb237bf6b3a3b86813b4a7bc4e10b263b3dd98e70c14  17-body-care.png
ebafaf94ea8eb19843829eb63abeea23830eb4631f5d1f6c2116271e52e60a49  18-success-rate.png
eccc4ebc420f2c1e39bcab1f31584923e4a16a9d4a656519df85bfc0c7022268  23-reason-05.png
ed3eccc08c4ebd2852148fd4039cb87c248760295c474e27f1bf30bfd7da0d34  02-fv.png
ee8ab01ed456af0a004b485d881b560001d27a2e6dd9fd9156747697ecfd8618  22-reason-04.png
```

## 手順4. GitHub API（Pages 情報）

```
## token source
GITHUB_TOKEN: set (env)
auth: Bearer token used

$ curl -sS -H "Authorization: Bearer $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" https://api.github.com/repos/vi-vari/HIOH-diet-lp/pages
{"message":"Access to this GitHub API path is not permitted through this proxy.","documentation_url":"https://docs.anthropic.com/en/docs/claude-code/github-actions"}
[http_code 403]

$ curl -sS -H "Authorization: Bearer $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" https://api.github.com/repos/vi-vari/HIOH-diet-lp/pages/builds/latest
{"message":"Access to this GitHub API path is not permitted through this proxy.","documentation_url":"https://docs.anthropic.com/en/docs/claude-code/github-actions"}
[http_code 403]
```

両エンドポイントとも `http_code 403`、本文は
`{"message":"Access to this GitHub API path is not permitted through this proxy.", ...}`。
→ この環境のプロキシでは `/repos/{owner}/{repo}/pages` 系 API への到達が許可されていない。Pages の設定・最新ビルド情報は取得できなかった。

## 手順5. 本レポートのプッシュ

作業クローン `/tmp/check/repo` で `origin/main` を基点に `claude/live-site-check` を作成し、本ファイルをコミット・プッシュ。
コマンドと結果は末尾に追記。

```
$ git checkout -b claude/live-site-check origin/main
Switched to a new branch 'claude/live-site-check'
exit=0
$ git log --oneline -1
103801f Swap in corrected 25-flow-02 and 23-reason-05 artwork
$ git add LIVE-SITE-CHECK.md && git commit -m "Add live site check report" && git push -u origin claude/live-site-check
（結果はコミット後のため本ファイルには含まれない。ブランチ上の存在をもって成功とする）
```
