import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/lib/components/ui/drawer";
import { Button } from "@/lib/components/ui/button";
import QRCode from "react-qr-code";

export default function QRCodeDialog({ trigger, data }) {
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">Refeição</DrawerTitle>
            <DrawerDescription className="text-center">
              Apresente este QRCode ao fiscal.
            </DrawerDescription>
          </DrawerHeader>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 1024,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={data}
              viewBox={`0 0 256 256`}
            />
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
