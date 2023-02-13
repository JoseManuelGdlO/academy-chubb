import { Injectable } from "@angular/core";
import { GetResult, Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  async set(key: string, value: string): Promise<void> {
    await Preferences.set({
      key,
      value
    });
  }

  async get(key: string): Promise<GetResult> {
   return( await Preferences.get({
      key
    }))
  }

  async remove(key: string): Promise<void> {
    return( await Preferences.remove({
       key
     }))
   }
}