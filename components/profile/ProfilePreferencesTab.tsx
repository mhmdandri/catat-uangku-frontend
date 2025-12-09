"use client";

import type { Preferences } from "@/lib/types";

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
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg text-gray-900">Pengaturan Umum</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900">Mata Uang</p>
              <p className="text-xs text-gray-500">Pilih mata uang default</p>
            </div>
            <select
              value={preferences.currency}
              onChange={(e) =>
                onPreferenceChange("currency", "", e.target.value)
              }
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="IDR">IDR - Rupiah</option>
              <option value="USD">USD - Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900">Bahasa</p>
              <p className="text-xs text-gray-500">Pilih bahasa interface</p>
            </div>
            <select
              value={preferences.language}
              onChange={(e) =>
                onPreferenceChange("language", "", e.target.value)
              }
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifikasi */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg text-gray-900">Notifikasi</h3>
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
                <p className="text-sm text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={
                    preferences.notifications[
                      item.key as keyof Preferences["notifications"]
                    ]
                  }
                  onChange={(e) =>
                    onPreferenceChange(
                      "notifications",
                      item.key,
                      e.target.checked
                    )
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privasi */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg text-gray-900">Privasi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900">Tampilkan Saldo</p>
              <p className="text-xs text-gray-500">
                Tampilkan saldo secara default
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={preferences.privacy.showBalance}
                onChange={(e) =>
                  onPreferenceChange("privacy", "showBalance", e.target.checked)
                }
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900">Profil Publik</p>
              <p className="text-xs text-gray-500">
                Izinkan orang lain melihat profil Anda
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={preferences.privacy.profilePublic}
                onChange={(e) =>
                  onPreferenceChange(
                    "privacy",
                    "profilePublic",
                    e.target.checked
                  )
                }
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreferencesTab;
