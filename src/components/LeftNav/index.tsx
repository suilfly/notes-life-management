import './LeftNav.scoped.scss';
import searchIcon from '@/assets/img/search.svg';
import homeIcon from '@/assets/img/home.svg';
import settingIcon from '@/assets/img/setting.svg';
import trashIcon from '@/assets/img/trash.svg';
import componentIcon from '@/assets/img/component.svg';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { NavObject, LeftNavProps } from './types';
import { useCallback, useState } from 'react';

const contents = [
  {
    name: '搜索',
    icon: searchIcon,
  },
  {
    name: '主页',
    icon: homeIcon,
    path: '/home',
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

export default function LeftNav(props: LeftNavProps) {
  const prop = Object.assign(
    {
      width: '248px',
      isRouteNav: true,
      content: contents,
    },
    props
  );
  const [isWrapShow, setIsWrapShow] = useState(false);
  const [isNavWrapped, setIsNavWrapped] = useState(false);

  const showWrapIcon = useCallback(() => {
    setIsWrapShow(true);
  }, []);

  const hideWrapIcon = useCallback(() => {
    setIsWrapShow(false);
  }, []);

  const wrapNavHandle = useCallback(() => {
    setIsNavWrapped(!isNavWrapped);
  }, [isNavWrapped]);

  function renderByType(menu: NavObject, index: number) {
    if (menu.path) {
      return (
        <Link className="note-nav-item" to={menu.path} key={index}>
          {renderMenuItem(menu)}
        </Link>
      );
    }
    return (
      <li className="note-nav-item" key={index} onClick={prop.onClickMenu}>
        {renderMenuItem(menu)}
      </li>
    );
  }

  function renderMenuItem(menu: NavObject) {
    return (
      <>
        {menu.icon && (
          <ReactSVG
            className="icon-wrapper"
            src={menu.icon}
            beforeInjection={(svg) => {
              svg.setAttribute(
                'style',
                'width: 20px;height: 20px;fill:var(--theme-normal-icon-fill)'
              );
            }}
          />
        )}
        <span>{menu.name}</span>
      </>
    );
  }

  return (
    <div
      className="note-leftnav-wrapper"
      onMouseEnter={showWrapIcon}
      onMouseLeave={hideWrapIcon}
    >
      <ul
        className={`nav-list-wrapper ${isNavWrapped ? 'nav-wrapped' : ''}`}
        style={{
          width: prop.width,
        }}
      >
        {prop.content.map((item, index) => {
          return renderByType(item, index);
        })}
      </ul>
      {(isWrapShow || isNavWrapped) && (
        <div
          className={`nav-wrap ${isNavWrapped ? 'nav-expand' : ''}`}
          onClick={wrapNavHandle}
        >
          <svg className="arrow-icon">
            <use xlinkHref="#left-arrow-icon"></use>
          </svg>
        </div>
      )}
    </div>
  );
}
