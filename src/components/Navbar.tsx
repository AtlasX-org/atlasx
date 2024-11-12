"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Menu, UserPen, X } from "lucide-react";
import { Symbols } from "@/app/types";
import WalletConnectModal from "./WalletConnectModal";
import { useAccount, useDisconnect } from "@gobob/sats-wagmi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [user, setUser] = useState({
    loggedIn: false,
    addr: "",
  });

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const connect = () => {
    setModalVisible(true);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`flex flex-row py-3 px-4 gap-5 items-center glass text-white font-semibold`}
        >
          <Link href="/" className="flex flex-row gap-1 text-xl items-center">
            <div className="relative w-16 h-10">
              <img src="/images/logo_white.png" alt="logo" />
            </div>
            AtlasX
          </Link>
          <div className="ml-auto hidden lg:flex flex-row items-center gap-10 text-white">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-black text-base font-semibold">
                    Derivatives
                  </NavigationMenuTrigger>

                  <NavigationMenuContent
                    className={` bg-black text-white w-full whitespace-nowrap`}
                  >
                    {Object.keys(Symbols).map((key) => (
                      <NavigationMenuLink key={key}>
                        <button
                          onClick={() => router.push(`/trade/${key}`)}
                          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                        >
                          {key.replace("USD", "")} FUT
                        </button>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link href="https://github.com/atlasx-org/atlasx" target="_blank">
              Documentation
            </Link>
            <Link href="#features">Features</Link>
            <Link href="/whitepaper">Whitepaper</Link>
          </div>
          <div className="hidden lg:block">
            {!address ? (
              <button
                onClick={() => connect()}
                className={`w-[15rem] items-center gap-2 rounded-md py-2 px-3 text-sm/6 font-semibold border-[1.5px] glass border-white
             `}
              >
                Connect Wallet
              </button>
            ) : (
              <div>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-black text-base font-semibold">
                        <UserPen />
                        {address
                          ? `${address.slice(0, 6)}...${address.slice(-4)}`
                          : ""}
                      </NavigationMenuTrigger>

                      <NavigationMenuContent
                        className={` bg-black text-white w-full whitespace-nowrap `}
                      >
                        <NavigationMenuLink>
                          <Link href="/profile">
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3">
                              Profile
                            </button>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                          <button
                            onClick={() => disconnect()}
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                          >
                            Disconnect Wallet
                          </button>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            )}
          </div>
          <div className="lg:hidden">
            <button onClick={handleMenuToggle} className="text-2xl">
              {menuOpen ? <Menu /> : <X />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div
            className={`lg:hidden flex flex-col items-center text-black py-4 font-bold`}
          >
            <Link
              href="https://github.com/atlasx-org/atlasx"
              target="_blank"
              className="py-2"
            >
              Github
            </Link>
            <Link
              href="https://github.com/atlasx-org/atlasx"
              target="_blank"
              className="py-2"
            >
              Documentation
            </Link>
            <Link href="#features" className="py-2">
              Features
            </Link>
            <Link href="/" className="py-2">
              Whitepaper
            </Link>
            <Link
              href=""
              target="_blank"
              className="bg-white shadow-md hover:bg-gray-200 transition-all shadow-white text-black text-center rounded-xl px-10 py-2 text-lg mt-4 w-3/4"
            >
              Connect Wallet
            </Link>
          </div>
        )}
      </div>
      <WalletConnectModal visible={modalVisible} setVisible={setModalVisible} />
    </div>
  );
}
