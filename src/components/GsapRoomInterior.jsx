// ----- 冠樺----- //

import React, { useEffect } from 'react';

import Furniture from "./GsapFurniture";

function GsapRoomInterior({
   furnList = [],
   pageDisplay = {},
   setPageDisplay = f => f,
   updatePage = false,
   setUpdatePage = f => f
}) {

   const outputFurniture = () => {
      return furnList[0] && furnList.map(obj =>
         <Furniture
            key={obj && obj.furn_id}
            {...obj}
            updatePage={updatePage}
            setUpdatePage={e => setUpdatePage(e)}
         />
      )
   }

   return (
      <React.Fragment>
         <div id="container" style={{ display: pageDisplay.roomInterior }}>
            <svg width="100%" viewBox="0 0 1920 1080" fill="none">
               <path d="M1920 0H0V1080H1920V0Z" fill="#F5F5CC" />
               <g
                  id="btnShop"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                     setPageDisplay(pageDisplay => (
                        {
                           ...pageDisplay,
                           roomInterior: 'none',
                           storage: 'none',
                           storeHeader: 'block',
                           storeFirstPage: 'block'
                        }
                     ));
                  }}
               >
                  <path d="M1862.5 28H1666.5C1647.45 28 1632 43.4462 1632 62.5C1632 81.5538 1647.45 97 1666.5 97H1862.5C1881.55 97 1897 81.5538 1897 62.5C1897 43.4462 1881.55 28 1862.5 28Z" fill="#50B6C2" />
                  <path d="M1874.51 49.963L1868.43 40.258C1868.16 39.8293 1867.79 39.476 1867.34 39.2312C1866.9 38.9864 1866.4 38.858 1865.89 38.858H1828.06C1827.56 38.8582 1827.06 38.9866 1826.61 39.2314C1826.17 39.4762 1825.8 39.8294 1825.53 40.258L1819.45 49.958C1816.31 54.968 1819.09 61.934 1824.96 62.73C1825.38 62.7863 1825.81 62.8143 1826.24 62.814C1827.54 62.8144 1828.83 62.5383 1830.03 62.004C1831.22 61.4697 1832.28 60.6893 1833.15 59.714C1834.02 60.6889 1835.08 61.4691 1836.27 62.0033C1837.46 62.5376 1838.75 62.8137 1840.06 62.8137C1841.36 62.8137 1842.65 62.5376 1843.85 62.0033C1845.04 61.4691 1846.1 60.6889 1846.97 59.714C1847.84 60.6889 1848.9 61.4691 1850.09 62.0033C1851.28 62.5376 1852.57 62.8137 1853.88 62.8137C1855.18 62.8137 1856.48 62.5376 1857.67 62.0033C1858.86 61.4691 1859.92 60.6889 1860.79 59.714C1861.66 60.6878 1862.72 61.4672 1863.91 62.0014C1865.1 62.5356 1866.4 62.8125 1867.7 62.814C1868.13 62.8147 1868.56 62.7866 1868.98 62.73C1874.86 61.949 1877.65 54.982 1874.51 49.963ZM1867.72 65.825C1866.79 65.815 1865.86 65.6956 1864.96 65.469V74.814H1829V65.469C1828.09 65.691 1827.17 65.8105 1826.24 65.825C1825.67 65.8253 1825.11 65.7879 1824.55 65.713C1824.03 65.6351 1823.52 65.5225 1823.02 65.376V83.803C1823.02 84.1973 1823.09 84.5878 1823.24 84.9522C1823.39 85.3166 1823.61 85.6477 1823.89 85.9264C1824.17 86.2052 1824.5 86.4261 1824.87 86.5765C1825.23 86.727 1825.62 86.804 1826.02 86.803H1867.96C1868.36 86.804 1868.75 86.727 1869.11 86.5765C1869.47 86.4261 1869.81 86.2052 1870.08 85.9264C1870.36 85.6477 1870.58 85.3166 1870.73 84.9522C1870.89 84.5878 1870.96 84.1973 1870.96 83.803V65.376C1870.46 65.5304 1869.95 65.6431 1869.43 65.713C1868.86 65.7877 1868.29 65.8252 1867.72 65.825V65.825Z" fill="#BC2121" />
                  <path d="M1660.94 43.516V76.471H1665.51V43.516H1660.94ZM1655.68 50.536V54.904H1669.37V50.536H1655.68ZM1661.33 52.603C1660.12 56.932 1657.39 62.587 1654.7 65.707C1655.4 66.877 1656.46 68.827 1656.89 70.192C1659.85 66.331 1662.58 59.389 1664.06 53.812L1661.33 52.603ZM1666.99 40.279C1664.1 41.527 1659.42 42.58 1655.21 43.165C1655.72 44.179 1656.34 45.778 1656.5 46.753C1660.94 46.285 1666.21 45.349 1670.11 43.906L1666.99 40.279ZM1665.12 55.84L1663.09 57.673C1664.3 59.311 1666.64 62.86 1667.53 64.732L1670.22 61.066C1669.48 60.169 1666.09 56.659 1665.12 55.84ZM1677.99 39.889V52.369H1682.63V39.889H1677.99ZM1670.34 41.683V44.53H1690.78V41.683H1670.34ZM1671.04 45.856V48.547H1689.88V45.856H1671.04ZM1669.13 49.873V52.798H1691.56V49.873H1669.13ZM1675.76 61.3H1685.24V62.977H1675.76V61.3ZM1675.76 65.629H1685.24V67.306H1675.76V65.629ZM1675.76 57.01H1685.24V58.609H1675.76V57.01ZM1671.55 54.124V70.192H1689.65V54.124H1671.55ZM1681.61 71.986C1683.91 73.429 1686.6 75.379 1688.09 76.549L1692.14 74.365C1690.39 73.117 1687.27 71.245 1684.73 69.724L1681.61 71.986ZM1675.92 69.529C1674.05 71.05 1670.34 72.883 1667.22 73.78C1668.12 74.56 1669.41 75.847 1670.11 76.705C1673.27 75.691 1677.17 73.78 1679.55 71.947L1675.92 69.529ZM1700.57 54.202V58.765H1721.67V54.202H1700.57ZM1720.14 54.202V55.06C1719.79 65.902 1719.36 70.27 1718.43 71.284C1718 71.713 1717.57 71.83 1716.87 71.83C1715.89 71.83 1713.87 71.791 1711.68 71.596C1712.54 72.922 1713.16 74.95 1713.24 76.315C1715.54 76.393 1717.8 76.432 1719.17 76.237C1720.65 76.003 1721.74 75.652 1722.72 74.326C1724.08 72.727 1724.55 68.086 1724.98 56.23C1725.02 55.645 1725.06 54.202 1725.06 54.202H1720.14ZM1704.97 40.396C1702.63 46.324 1698.3 51.784 1693.39 55.021C1694.52 55.918 1696.55 57.79 1697.45 58.804C1702.36 54.943 1707.12 48.664 1710.04 41.878L1704.97 40.396ZM1719.83 40.318L1715.23 42.151C1718.31 48.118 1723.11 54.436 1727.52 58.492C1728.41 57.166 1730.21 55.255 1731.49 54.241C1727.2 50.965 1722.29 45.271 1719.83 40.318ZM1707.55 55.528C1706.92 62.47 1705.99 69.061 1695.54 72.493C1696.63 73.507 1697.99 75.496 1698.58 76.783C1710.2 72.454 1711.88 64.303 1712.62 55.528H1707.55ZM1734.38 42.853V47.065H1768.66V42.853H1734.38ZM1748.89 39.889V45.349H1753.72V39.889H1748.89ZM1735.67 50.146V76.432H1740.11V54.163H1765.66V50.146H1735.67ZM1763.24 50.146V71.401C1763.24 71.947 1763.04 72.142 1762.38 72.142C1761.72 72.181 1759.46 72.181 1757.43 72.064C1758.05 73.234 1758.75 75.301 1758.95 76.549C1762.03 76.549 1764.21 76.432 1765.77 75.73C1767.3 75.028 1767.76 73.702 1767.76 71.44V50.146H1763.24ZM1745.49 53.656C1745.3 56.776 1744.48 58.297 1739.64 59.155C1740.46 59.896 1741.44 61.417 1741.79 62.392C1747.99 60.988 1749.32 58.336 1749.63 53.656H1745.49ZM1752.71 53.656V56.698C1752.71 59.896 1753.45 60.91 1756.92 60.91C1757.58 60.91 1759.38 60.91 1760.08 60.91C1762.5 60.91 1763.51 60.013 1763.9 56.698C1762.85 56.464 1761.21 55.918 1760.47 55.372C1760.35 57.283 1760.2 57.556 1759.57 57.556C1759.18 57.556 1757.9 57.556 1757.55 57.556C1756.84 57.556 1756.77 57.478 1756.77 56.62V53.656H1752.71ZM1743.93 62.392V74.677H1748.07V62.392H1743.93ZM1746.51 62.392V65.824H1755.13V69.139H1746.51V72.571H1759.34V62.392H1746.51ZM1741.36 46.987C1741.98 48.313 1742.69 50.107 1742.92 51.238L1747.76 50.263C1747.44 49.132 1746.7 47.455 1746 46.207L1741.36 46.987ZM1756.61 46.168C1756.18 47.377 1755.36 49.132 1754.7 50.341L1759.34 51.121C1760.04 50.068 1760.86 48.664 1761.8 46.948L1756.61 46.168ZM1793.11 53.149V57.283H1807.86V53.149H1793.11ZM1784.77 70.972V75.106H1803.1V70.972H1784.77ZM1790.89 49.483V63.952H1795.65V49.483H1790.89ZM1782.31 61.534V76.51H1786.87V65.668H1800.8V76.471H1805.59V61.534H1782.31ZM1789.29 39.889V46.987H1794.17V39.889H1789.29ZM1777.59 44.452V48.898H1808.4V44.452H1777.59ZM1775.29 44.452V54.319C1775.29 59.974 1775.06 68.203 1771.78 73.819C1772.91 74.287 1774.98 75.652 1775.84 76.432C1779.39 70.309 1779.97 60.637 1779.97 54.319V44.452H1775.29Z" fill="#FAF3E2" />
               </g>
               <g
                  id="btnStorage"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                     setPageDisplay(pageDisplay => (
                        { ...pageDisplay, storage: 'block' }
                     ));
                  }}
               >
                  <path d="M1862.5 112H1666.5C1647.45 112 1632 127.446 1632 146.5C1632 165.554 1647.45 181 1666.5 181H1862.5C1881.55 181 1897 165.554 1897 146.5C1897 127.446 1881.55 112 1862.5 112Z" fill="#50B6C2" />
                  <path d="M1874.49 133.977L1868.41 124.27C1868.14 123.84 1867.77 123.486 1867.32 123.24C1866.88 122.994 1866.38 122.865 1865.87 122.865H1828.02C1827.51 122.865 1827.01 122.994 1826.57 123.24C1826.12 123.486 1825.75 123.84 1825.48 124.27L1819.4 133.977C1816.26 138.99 1819.04 145.965 1824.91 146.758C1825.33 146.814 1825.76 146.842 1826.19 146.842C1827.5 146.843 1828.79 146.567 1829.98 146.032C1831.17 145.498 1832.24 144.718 1833.11 143.742C1833.98 144.718 1835.04 145.498 1836.23 146.033C1837.42 146.567 1838.72 146.844 1840.02 146.844C1841.33 146.844 1842.62 146.567 1843.81 146.033C1845 145.498 1846.07 144.718 1846.94 143.742C1847.81 144.718 1848.87 145.498 1850.06 146.033C1851.25 146.567 1852.55 146.844 1853.85 146.844C1855.16 146.844 1856.45 146.567 1857.64 146.033C1858.83 145.498 1859.9 144.718 1860.77 143.742C1861.64 144.716 1862.7 145.496 1863.89 146.03C1865.09 146.564 1866.38 146.841 1867.68 146.842C1868.11 146.843 1868.54 146.815 1868.97 146.758C1874.85 145.971 1877.64 139 1874.49 133.977ZM1867.7 149.85C1866.77 149.84 1865.84 149.721 1864.94 149.494V158.845H1828.96V149.494C1828.05 149.716 1827.12 149.835 1826.19 149.85C1825.63 149.85 1825.06 149.813 1824.5 149.738C1823.98 149.66 1823.47 149.547 1822.97 149.401V167.841C1822.97 168.637 1823.28 169.4 1823.85 169.962C1824.41 170.525 1825.17 170.841 1825.97 170.841H1867.94C1868.74 170.841 1869.5 170.525 1870.06 169.962C1870.63 169.4 1870.94 168.637 1870.94 167.841V149.4C1870.44 149.554 1869.93 149.667 1869.41 149.737C1868.84 149.812 1868.27 149.85 1867.7 149.85Z" fill="#227939" />
                  <path d="M1681.46 127.36C1683.56 129.271 1686.02 132.001 1687.03 133.873L1690.82 131.221C1689.65 129.388 1687.11 126.775 1684.97 124.942L1681.46 127.36ZM1655.91 134.965V139.411H1691.13V134.965H1655.91ZM1655.17 146.002L1656.34 150.721C1661.37 149.707 1668.16 148.342 1674.48 147.016L1674.12 142.765C1667.3 144.013 1659.89 145.3 1655.17 146.002ZM1663.32 128.686V154.972C1663.32 155.635 1663.09 155.83 1662.39 155.83C1661.68 155.869 1659.42 155.869 1657.2 155.752C1657.9 157.078 1658.68 159.184 1658.88 160.51C1662.07 160.51 1664.37 160.354 1665.93 159.613C1667.53 158.872 1668.04 157.585 1668.04 155.05V128.686H1663.32ZM1671.32 124.123C1667.3 125.488 1661.22 126.697 1655.72 127.438C1656.26 128.491 1656.85 130.246 1657.08 131.338C1662.74 130.714 1669.41 129.661 1674.48 128.101L1671.32 124.123ZM1675.14 124.201C1675.26 141.712 1678.3 160.666 1686.37 160.666C1689.92 160.666 1691.4 158.95 1692.14 152.047C1690.89 151.54 1689.3 150.448 1688.32 149.356C1688.09 153.997 1687.66 155.908 1686.84 155.908C1683.29 155.908 1679.78 139.918 1680.05 124.201H1675.14ZM1685.75 140.698C1682.28 147.133 1675.92 152.437 1669.25 155.479C1670.42 156.532 1671.71 158.092 1672.41 159.262C1679.47 155.518 1685.82 149.707 1689.88 142.453L1685.75 140.698ZM1698.58 130.207V134.302H1706.3V152.359H1698.58V156.493H1710.55V130.207H1698.58ZM1695.85 130.207V159.379H1700.1V130.207H1695.85ZM1698.38 140.62V144.676H1708.37V140.62H1698.38ZM1701.39 123.85C1701.19 125.995 1700.64 128.998 1700.1 131.026L1703.84 131.845C1704.62 130.012 1705.6 127.243 1706.49 124.591L1701.39 123.85ZM1715.7 129.934V134.185H1727.09V129.934H1715.7ZM1725.49 129.934V130.831C1725.06 147.094 1724.55 153.802 1723.3 155.128C1722.8 155.674 1722.37 155.83 1721.59 155.83C1720.61 155.83 1718.27 155.791 1715.74 155.596C1716.6 156.844 1717.22 158.833 1717.3 160.12C1719.56 160.237 1721.94 160.276 1723.42 160.042C1725.02 159.808 1726.11 159.379 1727.2 157.858C1728.8 155.791 1729.27 149.59 1729.78 132.04C1729.82 131.455 1729.82 129.934 1729.82 129.934H1725.49ZM1715.82 123.889C1714.57 129.076 1712.34 134.38 1709.73 137.656C1710.82 138.28 1712.73 139.606 1713.59 140.386C1716.24 136.642 1718.78 130.714 1720.3 124.942L1715.82 123.889ZM1713.9 141.166C1715.78 144.052 1718.23 147.874 1719.29 150.253L1723.26 147.835C1722.06 145.534 1719.48 141.79 1717.57 139.099L1713.9 141.166ZM1754.5 123.928V129.934H1759.07V123.928H1754.5ZM1745.81 135.238V138.748H1768.31V135.238H1745.81ZM1744.79 127.984V134.458H1748.97V131.494H1764.92V134.458H1769.28V127.984H1744.79ZM1754.97 136.174C1752.63 138.865 1748.26 141.088 1744.09 142.414C1744.83 143.155 1746 144.754 1746.43 145.534C1750.84 143.74 1755.63 140.854 1758.44 137.422L1754.97 136.174ZM1750.1 141.556C1757.16 146.392 1757.39 154.075 1755.48 155.83C1754.89 156.571 1754.19 156.649 1753.37 156.649C1752.51 156.649 1751.5 156.61 1750.29 156.493C1750.99 157.663 1751.31 159.34 1751.38 160.432C1752.4 160.471 1753.37 160.51 1754.23 160.471C1755.99 160.471 1757.23 160.12 1758.48 158.872C1762.03 155.947 1761.87 145.495 1753.18 139.684L1750.1 141.556ZM1760.59 136.564L1757.08 137.227C1758.75 146.275 1761.64 153.958 1767.26 158.092C1767.92 156.922 1769.32 155.284 1770.3 154.504C1765.03 151.15 1762.03 144.247 1760.59 136.564ZM1765.97 139.918C1764.8 141.595 1762.65 143.935 1761.13 145.3L1763.71 147.367C1765.35 146.158 1767.45 144.208 1769.48 142.414L1765.97 139.918ZM1754.15 142.882C1751.93 145.027 1747.48 147.523 1744.09 148.654C1744.83 149.434 1745.77 150.799 1746.24 151.696C1749.75 150.058 1754.31 147.094 1756.8 144.637L1754.15 142.882ZM1756.02 147.094C1753.49 150.37 1748.22 153.802 1743.66 155.284C1744.48 156.142 1745.38 157.624 1745.88 158.599C1750.56 156.571 1755.99 152.671 1758.87 148.927L1756.02 147.094ZM1741.24 124.045C1739.25 129.622 1735.86 135.16 1732.31 138.709C1733.13 139.84 1734.38 142.414 1734.81 143.545C1739.06 139.099 1743.12 132.079 1745.65 125.41L1741.24 124.045ZM1737.46 134.809V160.471H1741.95V130.402L1741.91 130.363L1737.46 134.809ZM1782.43 147.679V151.813H1808.44V147.679H1782.43ZM1797.75 154.153C1800.45 156.025 1804.03 158.794 1805.67 160.588L1808.83 157.351C1807.08 155.557 1803.37 152.983 1800.68 151.267L1797.75 154.153ZM1790.42 151.306C1788.47 153.49 1785.31 155.83 1782.27 157.234C1783.25 158.092 1784.53 159.574 1785.16 160.588C1788.32 159.028 1791.71 156.649 1794.01 153.919L1790.42 151.306ZM1786.02 125.332V149.551H1790.46V129.076H1800.84V149.551H1805.48V125.332H1786.02ZM1788.2 131.299V134.419H1802.63V131.299H1788.2ZM1788.2 136.72V139.84H1802.63V136.72H1788.2ZM1788.2 142.18V145.339H1802.63V142.18H1788.2ZM1780.24 124.006C1778.25 129.583 1774.9 135.16 1771.35 138.67C1772.13 139.801 1773.42 142.375 1773.85 143.545C1778.1 139.06 1782.15 132.04 1784.69 125.371L1780.24 124.006ZM1776.5 134.809V160.471H1780.95V130.402V130.363L1776.5 134.809Z" fill="#FAF3E2" />
               </g>
               <path id="horizon" d="M0 676H1920" stroke="#53480B" strokeWidth="6" />
               <Furniture key='duck' furn_id='duck' />
               {outputFurniture()}
               <g id="dropArea" style={{ display: 'none' }}>
                  <g filter="url(#filter17_f_9_260)">
                     <path d="M1845.54 999H74.4598C33.3368 999 0 1006.79 0 1016.39V1062.61C0 1072.21 33.3368 1080 74.4598 1080H1845.54C1886.66 1080 1920 1072.21 1920 1062.61V1016.39C1920 1006.79 1886.66 999 1845.54 999Z" fill="#FF7700" fill-opacity="0.3" />
                  </g>
                  <path d="M741.048 1024.9V1031.62H786.872V1024.9H741.048ZM737.4 1012.74V1019.71H788.984V1012.74H737.4ZM734.008 1037.18V1044.29H791.928V1037.18H734.008ZM758.584 1015.94V1040.58H766.776V1015.94H758.584ZM751.928 1041.15C750.072 1047.55 746.68 1056 743.544 1061.63L750.52 1064C753.848 1058.75 757.88 1050.75 761.272 1043.65L751.928 1041.15ZM735.416 1059.2L736.376 1067.46C749.048 1066.88 767.672 1066.05 784.952 1064.96L785.272 1057.66C767.416 1058.37 747.704 1059.01 735.416 1059.2ZM770.296 1049.79C775.864 1055.94 782.072 1064.38 784.824 1069.95L792.44 1065.66C789.432 1060.16 783.224 1052.22 777.464 1046.34L770.296 1049.79ZM845.437 1013.7V1020.54H878.076V1013.7H845.437ZM847.357 1044.16V1051.01H876.093V1044.16H847.357ZM857.981 1037.95V1063.23L865.597 1062.08V1037.95H857.981ZM844.733 1060.61L845.885 1068.29C854.653 1067.2 866.941 1065.6 878.397 1064.06L878.205 1056.9C866.237 1058.3 853.245 1059.84 844.733 1060.61ZM845.309 1030.21L845.757 1037.31C853.437 1036.99 864.125 1036.54 874.301 1035.97L874.493 1029.38C863.805 1029.76 852.669 1030.08 845.309 1030.21ZM864.957 1024.64C868.477 1029.18 872.381 1035.39 873.853 1039.36L879.933 1035.9C878.333 1031.87 874.237 1025.98 870.653 1021.63L864.957 1024.64ZM854.525 1017.86C853.501 1022.59 851.389 1029.18 849.533 1033.41L855.997 1035.14C858.109 1031.17 860.605 1025.02 862.845 1019.58L854.525 1017.86ZM880.444 1017.47V1053.7H887.805V1017.47H880.444ZM895.037 1011.46V1060.54C895.037 1061.7 894.653 1062.02 893.501 1062.08C892.221 1062.08 888.317 1062.14 884.477 1061.95C885.565 1064.13 886.653 1067.58 886.973 1069.76C892.413 1069.76 896.573 1069.5 899.133 1068.29C901.693 1067.07 902.525 1064.96 902.525 1060.61V1011.46H895.037ZM986.305 1015.94C992.193 1022.46 1003.27 1029.7 1012.61 1033.6C1013.83 1031.49 1015.55 1028.8 1017.28 1027.01C1007.23 1023.74 996.929 1017.41 989.761 1009.28H982.209C977.153 1015.87 966.785 1023.49 956.097 1027.65C957.569 1029.25 959.489 1032.06 960.385 1033.86C970.689 1029.38 980.865 1022.34 986.305 1015.94ZM975.105 1022.53V1027.9H997.569V1022.53H975.105ZM970.369 1037.57V1042.05H1002.5V1037.57H970.369ZM975.681 1062.34V1067.97H1005.7V1062.34H975.681ZM966.593 1030.27V1038.91C966.593 1046.46 965.697 1056.9 956.993 1064.13C958.657 1065.15 961.857 1067.97 963.009 1069.44C972.481 1061.38 974.401 1048.19 974.401 1039.1V1030.27H966.593ZM970.497 1030.27V1035.26H998.593V1044.54H970.433V1049.54H1006.08V1030.27H970.497ZM972.225 1052.03V1069.7H979.585V1057.54H1000.71V1069.7H1008.45V1052.03H972.225ZM1083.14 1024.9V1030.66H1125.89V1024.9H1083.14ZM1080.45 1056.7V1062.91H1128.07V1056.7H1080.45ZM1099.91 1021.25V1069.89H1107.21V1021.25H1099.91ZM1091.65 1045.76H1115.91V1048.96H1091.65V1045.76ZM1091.65 1038.27H1115.91V1041.34H1091.65V1038.27ZM1085 1033.54V1053.63H1122.95V1033.54H1085ZM1096.45 1009.66V1018.69H1104.45V1009.66H1096.45ZM1077 1014.66V1021.31H1127.56V1014.66H1077ZM1073.41 1014.66V1035.52C1073.41 1044.61 1072.97 1056.9 1067.72 1065.34C1069.38 1066.11 1072.58 1068.35 1073.86 1069.7C1079.75 1060.48 1080.71 1045.7 1080.71 1035.52V1014.66H1073.41Z" fill="#3E88A8" />
               </g>
               <defs>
                  <filter id="filter17_f_9_260" x="-40" y="959" width="2000" height="161" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                     <feFlood flood-opacity="0" result="BackgroundImageFix" />
                     <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                     <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_9_260" />
                  </filter>
               </defs>
            </svg>
         </div>
      </React.Fragment >
   );
}

export default GsapRoomInterior;