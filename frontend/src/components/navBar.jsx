import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import { toast } from "react-hot-toast";

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Interview", link: "/interviewForm" },
    { name: "Quiz", link: "/quiz" },
    { name: "Resume", link: "/resume" },
  ];

  return (
    <div className="relative w-[100vw]">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {
              authUser ? <NavbarButton variant="secondary" onClick={() => navigate("/logout")}>
                Logout
              </NavbarButton> : <NavbarButton variant="secondary" onClick={() => navigate("/login")}>
                Login
              </NavbarButton>
            }
            <NavbarButton variant="primary">Book a call</NavbarButton>
            {
              authUser && <Avatar
                alt="Remy Sharp"
                src={authUser.user.profilePicURL}
                sx={{ width: 48, height: 48 }}
              />
            }
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex gap-6 flex-row justify-center items-center mr-3">
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
              {
                authUser && <Avatar
                  alt="Remy Sharp"
                  src={authUser.user.profilePicURL}
                  sx={{ width: 48, height: 48 }}
                />
              }
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {
                authUser ? <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/logout');
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Logout
                </NavbarButton> : <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              }

              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

