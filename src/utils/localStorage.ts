function clearLocal(local){
  let locale = local.getItem('locale');
  let consent = local.getItem('consent');
  local.clear();
  if (locale) local.setItem('locale', locale);
  if (consent) local.setItem('consent', consent)
}

export {clearLocal}
