"use client";
import React, { useContext, useEffect, useMemo } from "react";
import SocketContext from "./SocketContext";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const uri = import.meta.env.VITE_WEBSOCKET_URL!;

  const socket: Socket = useMemo(
    () =>
      io(uri, {
        withCredentials: true,
        transports: ["websocket"],
        reconnection: true,
      }),
    []
  );

  useEffect(() => {
    const handleBidHired = (data: { gigTitle: string; message: string }) => {
      toast.success(
        <div className="flex flex-col">
          <span className="font-bold">{data.gigTitle}</span>
          <span>{data.message}</span>
        </div>,
        {
          duration: 5000,
          position: "top-right",
          style: {
            background: "#1f2937",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          },
        }
      );
    };

    socket.on("bid-hired", handleBidHired);

    return () => {
      socket.off("bid-hired", handleBidHired);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
