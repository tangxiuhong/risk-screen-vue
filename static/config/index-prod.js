/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://172.16.5.84:8287'
  // ws 接口请求地址
  window.SITE_CONFIG['wsUrl'] = 'ws://172.16.5.84:8287'

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './'// 域名
  window.SITE_CONFIG['version'] = '' // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})()
