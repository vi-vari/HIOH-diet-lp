/*
 * HIOH personal GYM ダイエットLP
 * ------------------------------------------------------------------
 * CTA（申込み・LINE等）のリンク先を1か所で管理する。
 * 下の CTA_URL に実際の申込みフォーム／LINE公式アカウントのURLを入れると、
 * ページ内のすべてのCTAバナー（class="js-cta"）にまとめて反映される。
 * 空文字のままの場合、CTAはクリックしても遷移しない（誤クリック防止）。
 */
(function () {
  'use strict';

  var CTA_URL = ''; // 例: 'https://lin.ee/xxxxxxx'

  var links = document.querySelectorAll('.js-cta');

  Array.prototype.forEach.call(links, function (link) {
    if (CTA_URL) {
      link.setAttribute('href', CTA_URL);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    } else {
      link.setAttribute('aria-disabled', 'true');
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });
    }
  });
})();
