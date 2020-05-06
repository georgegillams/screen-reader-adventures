import React, { Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import Space from './Space';

import STYLES from './oil-spill.scss';

const getClassName = cssModules(STYLES);

const OilSpill = props => {
  const { className, ...rest } = props;

  return (
    <div
      aria-hidden={true}
      className={getClassName('oil-spill__outer', className)}
      {...rest}
    >
      <svg
        viewBox="0 0 1583 2008"
        xmlns="http://www.w3.org/2000/svg"
        className={getClassName('oil-spill__svg')}
      >
        <path
          d="M374.163 292.038L506.224 191.491C545.39 161.672 596.391 152.229 643.636 166.049L666.797 172.824C717.445 187.64 772.152 175.669 811.984 141.055L833.201 122.617C906.5 58.9207 1019.65 77.5412 1068.67 161.368L1091.79 200.908C1110.9 233.585 1141.31 258.14 1177.28 269.939L1284.44 305.091C1378.52 335.955 1419.94 445.92 1369.59 531.182L1344.82 573.126C1307.57 636.204 1319.57 716.747 1373.59 766.23L1480.21 863.906C1531.04 910.472 1545.01 985.013 1514.48 1046.82L1388.79 1301.38C1374.61 1330.09 1369.67 1362.48 1374.65 1394.11L1401.08 1562C1405.59 1590.63 1401.98 1619.94 1390.67 1646.62L1304.55 1849.7C1271.61 1927.37 1182.61 1964.43 1104.29 1933.1L915.164 1857.46C877.557 1842.42 835.556 1842.7 798.151 1858.23L604.889 1938.5C528.292 1970.32 445.1 1910.05 451.464 1827.35C455.157 1779.36 427.535 1734.44 383.04 1716.09L195.349 1638.67C126.615 1610.31 100.2 1526.73 140.154 1464.03C163.99 1426.62 165.137 1379.08 143.132 1340.57L53.6149 1183.89C21.4007 1127.5 27.7499 1057.01 69.5216 1007.29L328.307 699.26C365.897 654.516 375.127 592.434 352.179 538.69L325.509 476.228C297.63 410.934 317.676 335.046 374.163 292.038Z"
          className={getClassName('oil-spill__path')}
        />
      </svg>
    </div>
  );
};

export default OilSpill;