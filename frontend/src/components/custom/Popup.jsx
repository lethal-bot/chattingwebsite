import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { sendOtp, verify } from "@/lib/api";
function Popup({ open, handleClose, email }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  function closeHandler() {
    setLoading(false);
    handleClose();
  }
  function changeHandler(e) {
    setError("");
    setOtp(e);
  }

  async function resendOtp() {
    setLoading(true);
    try {
      const res = await fetch(sendOtp + "/" + email);
      console.log(res);
      if (!res.ok) throw new Error(res);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitHandler() {
    setLoading(true);
    setError("");
    if (otp.length != 4 || !email) {
      if (otp.length != 4) setError("invalid otp length");
      else setError("invalid email");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(verify, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data);
      console.log(data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={closeHandler}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>One Time Password</DialogTitle>
            <DialogDescription>
              Enter otp for email verification.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center space-x-2">
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onChange={(e) => changeHandler(e)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter className=" sm:justify-start">
            {!loading && (
              <Button type="button" variant="secondary" onClick={submitHandler}>
                Submit
              </Button>
            )}
            {loading && (
              <Button type="button" variant="secondary" disabled>
                Verifying..
              </Button>
            )}
            {!loading && (
              <Button type="button" variant="secondary" onClick={resendOtp}>
                Resend Otp
              </Button>
            )}
            {loading && (
              <Button type="button" variant="secondary" disabled>
                Resending
              </Button>
            )}

            {error && <p className="error">{error}</p>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Popup;
