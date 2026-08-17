/*
 * HIOH personal GYM ダイエットLP
 * ------------------------------------------------------------------
 * CTAのリンク先を1か所で管理する。
 * ボタンの画像に書かれている行き先ごとに、下の2つのURLへ振り分ける。
 *
 *   js-cta--line       … LINE公式アカウント（ヘッダー／FV直下／各CTAブロックの緑ボタン：計7か所）
 *   js-cta--hotpepper  … ホットペッパービューティー（各CTAブロックのピンクボタン：計5か所）
 *
 * HOTPEPPER_URL が空の場合、ピンクのボタンは LINE_URL にフォールバックする
 * （リンク切れのボタンを出さないため）。ホットペッパーのURLが決まったら
 * HOTPEPPER_URL に入れれば、そちらへ切り替わる。
 * 両方が空の場合はクリックしても遷移しない（誤クリック防止）。
 */
(function () {
  'use strict';

  var LINE_URL = 'https://lin.ee/qhpQ3eV';
  var HOTPEPPER_URL = ''; // 例: 'https://beauty.hotpepper.jp/kr/slnH000xxxxxx/'

  var GROUPS = [
    { selector: '.js-cta--line', url: LINE_URL },
    { selector: '.js-cta--hotpepper', url: HOTPEPPER_URL || LINE_URL }
  ];

  function disable(link) {
    link.setAttribute('aria-disabled', 'true');
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  }

  GROUPS.forEach(function (group) {
    var links = document.querySelectorAll(group.selector);

    Array.prototype.forEach.call(links, function (link) {
      if (group.url) {
        link.setAttribute('href', group.url);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      } else {
        disable(link);
      }
    });
  });

  /* 振り分けクラスが付いていない旧マークアップ向けの保険 */
  var untagged = document.querySelectorAll(
    '.js-cta:not(.js-cta--line):not(.js-cta--hotpepper)'
  );
  Array.prototype.forEach.call(untagged, function (link) {
    if (LINE_URL) {
      link.setAttribute('href', LINE_URL);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    } else {
      disable(link);
    }
  });
})();
