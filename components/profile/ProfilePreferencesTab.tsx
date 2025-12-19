"use client";
import { Switch } from "@/components/ui/switch";
import { SelectCurrency } from "../SelectCurrency";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Computer, Moon, Sun } from "lucide-react";
import { Preferences } from "@/lib/types/profile";
type Props = {
  preferences: Preferences;
  onPreferenceChange: (
    category: keyof Preferences,
    key: string,
    value: unknown
  ) => void;
};
const ProfilePreferencesTab: React.FC<Props> = ({
  preferences,
  onPreferenceChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
        <h3 className="mb-4 text-lg text-foreground">Pengaturan Umum</h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-foreground">Mata Uang</p>
              <p className="text-xs text-muted-foreground">
                Pilih mata uang default
              </p>
            </div>
            <div className="w-full sm:w-56 rounded-lg text-foreground px-3 py-2 text-sm">
              <SelectCurrency
                value={preferences.currency}
                onChange={(value) => onPreferenceChange("currency", "", value)}
              ></SelectCurrency>
            </div>
            {/* <select
              value={preferences.currency}
              onChange={(e) =>
                onPreferenceChange("currency", "", e.target.value)
              }
              className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="IDR">IDR - Rupiah</option>
              <option value="USD">USD - Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select> */}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-foreground">Bahasa</p>
              <p className="text-xs text-muted-foreground">
                Pilih bahasa interface
              </p>
            </div>
            <select
              value={preferences.language}
              onChange={(e) =>
                onPreferenceChange("language", "", e.target.value)
              }
              className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-foreground">Tema</p>
              <p className="text-xs text-muted-foreground">
                Pilih tema tampilan
              </p>
            </div>
            <div>
              <Tabs
                value={preferences.theme}
                className="w-full sm:w-auto px-3 py-2.5 sm:py-2"
                onValueChange={(value) =>
                  onPreferenceChange("theme", "", value)
                }
              >
                <TabsList>
                  <TabsTrigger value="system" className="flex gap-2">
                    <Computer />
                    System
                  </TabsTrigger>
                  <TabsTrigger value="light" className="flex gap-2">
                    <Sun />
                    Light
                  </TabsTrigger>
                  <TabsTrigger value="dark" className="flex gap-2">
                    <Moon />
                    Dark
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {/* <select
              value={preferences.theme}
              onChange={(e) => onPreferenceChange("theme", "", e.target.value)}
              className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="system">Sistem</option>
              <option value="light">Terang</option>
              <option value="dark">Gelap</option>
            </select> */}
          </div>
        </div>
      </div>
      <div className="w-full sm:w-auto rounded-lg border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg text-foreground">Notifikasi</h3>
        <div className="space-y-4">
          {[
            {
              key: "email",
              title: "Email Notifikasi",
              desc: "Terima notifikasi via email",
            },
            {
              key: "push",
              title: "Push Notifikasi",
              desc: "Terima notifikasi push",
            },
            {
              key: "budgetAlert",
              title: "Peringatan Budget",
              desc: "Notifikasi saat budget hampir habis",
            },
            {
              key: "transactionReminder",
              title: "Pengingat Transaksi",
              desc: "Ingatkan untuk catat transaksi harian",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={
                  preferences.notifications[
                    item.key as keyof Preferences["notifications"]
                  ]
                }
                onCheckedChange={(checked) =>
                  onPreferenceChange("notifications", item.key, checked)
                }
                aria-label={item.title}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full sm:w-auto rounded-lg border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg text-foreground">Privasi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Tampilkan Saldo</p>
              <p className="text-xs text-muted-foreground">
                Tampilkan saldo secara default
              </p>
            </div>
            <Switch
              checked={preferences.privacy.showBalance}
              onCheckedChange={(checked) =>
                onPreferenceChange("privacy", "showBalance", checked)
              }
              aria-label="Tampilkan Saldo"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Profil Publik</p>
              <p className="text-xs text-muted-foreground">
                Izinkan orang lain melihat profil Anda
              </p>
            </div>
            <Switch
              checked={preferences.privacy.profilePublic}
              onCheckedChange={(checked) =>
                onPreferenceChange("privacy", "profilePublic", checked)
              }
              aria-label="Profil Publik"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreferencesTab;
