import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";
import { Label } from "../atoms/index";
import TyproLogo from "../atoms/TyproLogo";
import { AfterLoginButton, BeforeLoginButton } from "../molecules/index";
import { RankingDrawer } from "../molecules";
import { DropdownIcon } from "../atoms/";
import { useRouter } from "next/router";

type PROPS = {};

const Header: React.FC<PROPS> = () => {
  const user = useSelector(getUser).user;
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!router.pathname.match("/users/coop/")) {
    // coopフォルダ配下はHeaderを表示しない
    return (
      <div className="w-screen flex items-center h-16 bg-gray-400">
        <button className="flex items-center w-1/10 pl-16">
          <TyproLogo />
        </button>
        <div className="flex justify-evenly w-1/2 items-center">
          <Label labelText="TyPro" href={"/"} />
          <Label labelText="概要" href={"/outline"} />
          <Label labelText="問題" href={"/users/selectlanguage"} />
          <div>
            <button
              onClick={handleClick}
              className="font-semibold text-white hover:text-gray-600"
            >
              ランキング
              <DropdownIcon />
            </button>
            <RankingDrawer
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            />
          </div>
          <Label labelText="投稿" href={"/users/submit"} />
        </div>
        <div className="w-1/5"></div>
        <div className="w-1/5 flex items-center justify-evenly  ">
          {user.isSignedIn ? <AfterLoginButton /> : <BeforeLoginButton />}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-screen flex items-center h-16 bg-gray-400">
        <button className="flex items-center w-1/10 pl-16">
          <TyproLogo disabled={true} />
        </button>
        <div
          className="flex justify-evenly w-1/2 items-center"
          aria-disabled={true}
        >
          <Label labelText="TyPro" href={"/"} disabled={true} />
          <Label labelText="概要" href={"/outline"} disabled={true} />
          <Label
            labelText="問題"
            href={"/users/selectlanguage"}
            disabled={true}
          />
          <div>
            <button
              onClick={handleClick}
              className="font-semibold text-white hover:text-gray-600"
              disabled={true}
            >
              ランキング
              <DropdownIcon />
            </button>
          </div>
          <Label labelText="投稿" href={"/users/submit"} disabled={true} />
        </div>
        <div className="w-1/5"></div>
        <div className="w-1/5 flex items-center justify-evenly  ">
          {user.isSignedIn ? (
            <AfterLoginButton disabled={true} />
          ) : (
            <BeforeLoginButton />
          )}
        </div>
      </div>
    );
  }
};

export default Header;
