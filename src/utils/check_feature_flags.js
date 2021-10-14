const hasFeatureFlag = (flag = '') => {
  if (process.env.NODE_ENV === 'development') return true;
  if (!window || !window.VendorPortal) return false;
  const hasFlag = window.VendorPortal.features.isEnabled(flag);
  return hasFlag;
};

export default hasFeatureFlag;
