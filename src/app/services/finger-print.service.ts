import { Injectable } from "@angular/core";
import { NativeBiometric } from "capacitor-native-biometric";

@Injectable({
  providedIn: 'root'
})
export class FingerPrintService {

  async auth(): Promise<boolean> {
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) return false;

    return new Promise((resolve, reject) => {
      NativeBiometric.verifyIdentity({
        reason: "For easy log in",
        title: "Log in",
        subtitle: "Maybe add subtitle here?",
        description: "Maybe a description too?",
      })
        .then(() => { resolve(true) })
        .catch(() => { reject(false) });
    })

  }
}