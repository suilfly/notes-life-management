import './LeftNav.scoped.scss';
import searchIcon from '@/assets/img/search.svg';
import homeIcon from '@/assets/img/home.svg';
import settingIcon from '@/assets/img/setting.svg';
import trashIcon from '@/assets/img/trash.svg';
import { ReactSVG } from 'react-svg';

const contents = [
  {
    name: '搜索',
    icon: searchIcon,
  },
  {
    name: '主页',
    icon: homeIcon,
  },
  {
    name: '回收站',
    icon: trashIcon,
  },
  {
    name: '设置',
    icon: settingIcon,
  },
];

export default function LeftNav({ width = '248px', content = contents }) {
  return (
    <ul
      className="note-leftnav-wrapper"
      style={{
        width,
      }}
    >
      {content.map((item, index) => {
        return (
          <li className="note-nav-item" key={index}>
            {item.icon && (
              <ReactSVG
                className="icon-wrapper"
                src={item.icon}
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    'style',
                    'width: 20px;height: 20px;fill:var(--theme-normal-icon-fill)'
                  );
                }}
              />
            )}
            <span>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
}
