import React from "react";
import { useConnect, SatsConnector } from "@gobob/sats-wagmi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Wallet } from "lucide-react";

export default function WalletConnectModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const { connectors, connect } = useConnect();

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to the application.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          {connectors.map((connector) => (
            <Button
              key={connector.name}
              onClick={() => {
                connect({ connector });
                setVisible(false);
              }}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12"
            >
              <Wallet className="w-4 h-4" />
              {connector.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
