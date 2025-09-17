import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { LuLogOut } from "react-icons/lu";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle popover (for profile image)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // store button reference
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  // Logout
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload(); // refreshing the screen
  };

  // Google login setup
  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false); // ✅ close dialog after login success
        window.location.reload();
      });
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center">
      <img src="/logo.svg" alt="logo" />
      {user ? (
        <div className="flex items-center gap-3">
          <a href="/my-trips">
            <Button variant="outlined" className="rounded-full">
            My Trips
          </Button>
          </a>
          <div>
            <Button onClick={handleClick}>
              <img
                src={user?.picture}
                alt="profile"
                className="h-[35px] w-[35px] rounded-full"
              />
            </Button>

            {/* Popover for profile actions */}
            <Popover
              open={openPopover}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography
                sx={{ p: 2 }}
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleLogout}
              >
                Logout <LuLogOut />
              </Typography>
            </Popover>
          </div>
        </div>
      ) : (
        <div>
          {/* Sign In button */}
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Sign In
          </Button>

          {/* Dialog for sign in */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogContent>
              <DialogContentText>
                You are not authenticated. Please sign in with Google.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button variant="contained" onClick={() => handleLogin()}>
                Sign In
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Header;
