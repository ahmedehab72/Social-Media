"use client";

import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { colors } from "@mui/material";
import { BorderAll, Padding } from "@mui/icons-material";
import { Context } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { userToken, setUserToken } = useContext<any>(Context);
  let router: any = useRouter();
  let { userPhoto, userInfo }: any = useSelector((state: any) => state.users);
  // console.log(userPhoto);

  function UserLogOut() {
    setUserToken(null);
    localStorage.removeItem("userToken");
    router.push("/login");
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className="nav" position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Social Media
          </Typography>

          {userToken !== null ? (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* <MenuItem onClick={handleCloseNavMenu}>
                  <Button>
                    <Typography textAlign="center">
                      <Link href={"/"}>Home</Link>
                    </Typography>
                  </Button>
                </MenuItem> */}

                <MenuItem onClick={handleCloseNavMenu}>
                  <Button>
                    <Typography textAlign="center">
                      <Link href={"/profile"}>Profile</Link>
                    </Typography>
                  </Button>
                </MenuItem>
                {/* <MenuItem onClick={handleCloseNavMenu}>
                  <Button>
                    <Typography textAlign="center">
                      <Link href={"/posts"}>Posts</Link>
                    </Typography>
                  </Button>
                </MenuItem> */}
              </Menu>
            </Box>
          ) : null}
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />  */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={"/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
             Social Media
          </Typography>
          {userToken !== null ? (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link href={'/'}>Home</Link>
            </Button> */}
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2,marginRight:'7px',marginLeft:'50px', color: "black", display: "block" }}
              >
                <Link href={"/profile"}>Profile</Link>
              </Button>
              {/* <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                <Link href={"/posts"}>Posts</Link>
              </Button> */}
            </Box>
          ) : null}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userInfo?.photo} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px"  }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userToken !== null ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Button>
                      <Link href={"/profile"}>Profile</Link>
                    </Button>
                  </Typography>
                </MenuItem>
              ) : null}

              {userToken == null ? (
                <Box>
                  {" "}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Button>
                        <Link href={"/login"}>Login</Link>
                      </Button>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Button>
                        <Link href={"/register"}>Register</Link>
                      </Button>
                    </Typography>
                  </MenuItem>{" "}
                </Box>
              ) : null}

              {userToken !== null ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Button onClick={() => UserLogOut()}>
                      <Link href={"/login"}>Logout</Link>
                    </Button>
                  </Typography>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
