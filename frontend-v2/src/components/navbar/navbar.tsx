import {
  Button,
  Dropdown,
  Link,
  Navbar,
  Switch,
  Text,
  useTheme,
} from '@nextui-org/react';
import React, { type ReactElement } from 'react';
import { ModalLogin } from '../modal';
import { icons } from './icons';
import { Logo } from './logo';
import { useTheme as useNextTheme } from 'next-themes';
import { GithubIcon } from '../icons/GithubIcon';
import { ModalRegister } from '../modal/register';

export const Nav = (): ReactElement => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const collapseItems = [
    'Features',
    'Customers',
    'Pricing',
    'Company',
    'Legal',
  ];
  return (
    <Navbar
      isBordered
      css={{
        overflow: 'hidden',
        '& .nextui-navbar-container': {
          background: '$background',
          borderBottom: 'none',
        },
      }}
    >
      <Navbar.Brand>
        <Navbar.Toggle aria-label='toggle navigation' showIn='xs' />
        <Logo />
        <Text b color='inherit' hideIn='xs'>
          ELearning Platform
        </Text>
        <Navbar.Content
          hideIn='sm'
          css={{
            pl: '6rem',
          }}
        >
          <Dropdown isBordered>
            <Navbar.Item>
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: 'center',
                  svg: { pe: 'none' },
                }}
                iconRight={icons.chevron}
                ripple={false}
              >
                Features
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label='ELearning Platform features'
              css={{
                $$dropdownMenuWidth: '340px',
                $$dropdownItemHeight: '70px',
                '& .nextui-dropdown-item': {
                  py: '$4',
                  svg: {
                    color: '$secondary',
                    mr: '$4',
                  },
                  '& .nextui-dropdown-item-content': {
                    w: '100%',
                    fontWeight: '$semibold',
                  },
                },
              }}
            >
              <Dropdown.Item
                key='autoscaling'
                showFullDescription
                description='ELearning Platform scales apps to meet user demand, automagically, based on load.'
                icon={icons.scale}
              >
                Autoscaling
              </Dropdown.Item>
              <Dropdown.Item
                key='usage_metrics'
                showFullDescription
                description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
                icon={icons.activity}
              >
                Usage Metrics
              </Dropdown.Item>
              <Dropdown.Item
                key='production_ready'
                showFullDescription
                description='ELearning Platform runs on ELearning Platform, join us and others serving requests at web scale.'
                icon={icons.flash}
              >
                Production Ready
              </Dropdown.Item>
              <Dropdown.Item
                key='99_uptime'
                showFullDescription
                description='Applications stay on the grid with high availability and high uptime guarantees.'
                icon={icons.server}
              >
                +99% Uptime
              </Dropdown.Item>
              <Dropdown.Item
                key='supreme_support'
                showFullDescription
                description='Overcome any challenge with a supporting team ready to respond.'
                icon={icons.user}
              >
                +Supreme Support
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Navbar.Link isActive href='#'>
            Customers
          </Navbar.Link>
          <Navbar.Link href='#'>Pricing</Navbar.Link>
          <Navbar.Link href='#'>Company</Navbar.Link>
        </Navbar.Content>
      </Navbar.Brand>

      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <Link
              color='inherit'
              css={{
                minWidth: '100%',
              }}
              href='#'
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
        <Navbar.CollapseItem>
          <Link
            color='inherit'
            css={{
              minWidth: '100%',
            }}
            target='_blank'
            href='#'
          >
            <GithubIcon />
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Switch
            checked={isDark}
            onChange={(e) => {
              setTheme(e.target.checked ? 'dark' : 'light');
            }}
          />
        </Navbar.CollapseItem>
      </Navbar.Collapse>
      <Navbar.Content>
        <ModalLogin />

        <ModalRegister />

        <Navbar.Item>
          <Link color='inherit' href='/admin'>
            Admin
          </Link>
        </Navbar.Item>
        <Navbar.Item>
          <Button auto flat href='#'>
            Start free trial
          </Button>
        </Navbar.Item>
        <Navbar.Item hideIn={'xs'}>
          <Link
            color='inherit'
            css={{
              minWidth: '100%',
            }}
            target='_blank'
            href='#'
          >
            <GithubIcon />
          </Link>
        </Navbar.Item>
        <Navbar.Item hideIn={'xs'}>
          <Switch
            checked={isDark}
            onChange={(e) => {
              setTheme(e.target.checked ? 'dark' : 'light');
            }}
          />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};
