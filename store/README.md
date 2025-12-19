# State Management Guide

## Store Architecture

Aplikasi menggunakan Zustand untuk state management dengan 4 store utama yang telah direfactor untuk efisiensi dan DRY (Don't Repeat Yourself).

---

## 1. useModalStore

**File**: `store/useModalStore.ts`

Generic store untuk mengelola semua modal di aplikasi.

### Modal Types

- `account` - Modal tambah akun
- `transaction` - Modal tambah transaksi
- `deleteAccount` - Modal konfirmasi hapus akun
- `deleteTransaction` - Modal konfirmasi hapus transaksi
- `editAccount` - Modal edit akun
- `editTransaction` - Modal edit transaksi

### API Methods

```typescript
const {
  openModal, // (type, data?) => void - Buka modal dengan optional data
  closeModal, // (type) => void - Tutup modal
  isOpen, // (type) => boolean - Cek apakah modal terbuka
  getData, // <T>(type) => T - Ambil data modal
  setData, // (type, data) => void - Set data modal
} = useModalStore();
```

### Usage Examples

#### Basic Modal

```typescript
import { useModalStore } from "@/store/useModalStore";

export default function AddAccountButton() {
  const { openModal } = useModalStore();

  return <button onClick={() => openModal("account")}>Tambah Akun</button>;
}

export default function AddAccountModal() {
  const { isOpen, closeModal } = useModalStore();

  return (
    <Dialog open={isOpen("account")} onOpenChange={() => closeModal("account")}>
      {/* Modal content */}
    </Dialog>
  );
}
```

#### Modal dengan Data

```typescript
// Buka modal dengan data
const handleEdit = (account: Account) => {
  openModal("editAccount", { account });
};

// Ambil data di modal
export default function EditAccountModal() {
  const { isOpen, closeModal, getData } = useModalStore();
  const { account } = getData<{ account: Account }>("editAccount");

  return (
    <Dialog
      open={isOpen("editAccount")}
      onOpenChange={() => closeModal("editAccount")}
    >
      <h2>Edit {account?.name}</h2>
      {/* Form */}
    </Dialog>
  );
}
```

#### Konfirmasi Delete dengan Data

```typescript
const handleDelete = (accountId: string, accountName: string) => {
  openModal("deleteAccount", { accountId, accountName });
};

export default function DeleteAccountModal() {
  const { isOpen, closeModal, getData } = useModalStore();
  const { accountId, accountName } = getData<{
    accountId: string;
    accountName: string;
  }>("deleteAccount");

  const handleConfirm = async () => {
    await deleteAccount(accountId);
    closeModal("deleteAccount");
  };

  return (
    <AlertDialog open={isOpen("deleteAccount")}>
      <AlertDialogContent>
        <AlertDialogTitle>Hapus {accountName}?</AlertDialogTitle>
        <AlertDialogDescription>
          Tindakan ini tidak dapat dibatalkan.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => closeModal("deleteAccount")}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

---

## 2. useToggleStore

**File**: `store/useToggleStore.ts`

Generic store untuk mengelola semua toggle/switch state dengan persistence.

### Toggle Keys

- `balanceVisibility` - Tampilkan/sembunyikan saldo
- `darkMode` - Mode gelap (jika diperlukan)
- `sidebarCollapsed` - Sidebar collapse state

### API Methods

```typescript
const {
  toggle, // (key) => void - Toggle on/off
  setToggle, // (key, value) => void - Set value spesifik
  isActive, // (key) => boolean - Cek apakah aktif
} = useToggleStore();
```

### Usage Examples

#### Toggle Balance Visibility

```typescript
import { useToggleStore } from "@/store/useToggleStore";

export default function BalanceToggle() {
  const { isActive, toggle } = useToggleStore();
  const showBalances = isActive("balanceVisibility");

  return (
    <button onClick={() => toggle("balanceVisibility")}>
      {showBalances ? <Eye /> : <EyeOff />}
      {showBalances ? "Sembunyikan" : "Tampilkan"} Saldo
    </button>
  );
}
```

#### Read Toggle Value

```typescript
export default function AccountCard({ amount }) {
  const showBalances = useToggleStore((state) =>
    state.isActive("balanceVisibility")
  );

  return (
    <div>
      <p>{showBalances ? formatCurrency(amount) : "••••••"}</p>
    </div>
  );
}
```

#### Set Toggle Programmatically

```typescript
const { setToggle } = useToggleStore();

// Force show balances
setToggle("balanceVisibility", true);

// Force hide balances
setToggle("balanceVisibility", false);
```

---

## 3. useLoadingStore

**File**: `store/useLoadingStore.ts`

Store untuk mengelola global loading state.

### API Methods

```typescript
const {
  isLoading, // boolean
  startLoading, // () => void
  stopLoading, // () => void
  setLoading, // (value: boolean) => void
} = useLoadingStore();
```

### Usage Examples

```typescript
import { useLoadingStore } from "@/store/useLoadingStore";

export default function DataFetcher() {
  const { startLoading, stopLoading } = useLoadingStore();

  const fetchData = async () => {
    startLoading();
    try {
      const data = await api.getData();
      return data;
    } finally {
      stopLoading();
    }
  };

  return <button onClick={fetchData}>Load Data</button>;
}
```

---

## 4. useDeviceStore

**File**: `store/useDeviceStore.ts`

Store untuk deteksi device type (mobile, tablet, desktop) secara reactive.

### State Properties

```typescript
const {
  isMobile, // boolean - width < 768px
  isTablet, // boolean - 768px <= width < 1024px
  isDesktop, // boolean - width >= 1024px
  width, // number - current window width
  setDevice, // (width: number) => void - manual set (optional)
} = useDeviceStore();
```

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

### Usage Examples

#### Conditional Rendering

```typescript
import { useDeviceStore } from "@/store/useDeviceStore";

export default function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop } = useDeviceStore();

  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

#### Conditional Styling

```typescript
export default function Card() {
  const isMobile = useDeviceStore((state) => state.isMobile);

  return (
    <div className={isMobile ? "p-4" : "p-8"}>
      <h1 className={isMobile ? "text-xl" : "text-3xl"}>Title</h1>
    </div>
  );
}
```

#### Show/Hide Based on Device

```typescript
export default function Navigation() {
  const { isMobile, isDesktop } = useDeviceStore();

  return (
    <>
      {isMobile && <MobileNav />}
      {isDesktop && <DesktopNav />}
    </>
  );
}
```

#### Use Current Width

```typescript
export default function DynamicLayout() {
  const width = useDeviceStore((state) => state.width);

  const columns = width < 640 ? 1 : width < 1024 ? 2 : 3;

  return (
    <div className={`grid grid-cols-${columns} gap-4`}>{/* content */}</div>
  );
}
```

### Auto-Update

Store ini **otomatis** mendengarkan `window.resize` event dan update state secara real-time. Tidak perlu setup manual!

### SSR Support

Store ini aman untuk SSR (Server-Side Rendering). Default value untuk server adalah desktop (width: 1024).

---

## Menambah Modal/Toggle Baru

### Tambah Modal Baru

1. Edit `store/useModalStore.ts`:

```typescript
type ModalType = "account" | "transaction" | "newModal"; // ← Tambah ini
// ...
```

2. Tambah ke initial state:

```typescript
modals: {
  // ...existing
  newModal: false,
},
modalData: {
  // ...existing
  newModal: {},
},
```

3. Gunakan di component:

```typescript
const { openModal, isOpen, closeModal } = useModalStore();

// Buka
<button onClick={() => openModal('newModal', { someData: 'value' })}>
  Open
</button>

// Modal
<Dialog open={isOpen('newModal')} onOpenChange={() => closeModal('newModal')}>
  {/* content */}
</Dialog>
```

### Tambah Toggle Baru

1. Edit `store/useToggleStore.ts`:

```typescript
type ToggleKey = "balanceVisibility" | "newToggle"; // ← Tambah ini
```

2. Tambah default value:

```typescript
toggles: {
  // ...existing
  newToggle: false,
},
```

3. Gunakan:

```typescript
const { toggle, isActive } = useToggleStore();
const isOn = isActive("newToggle");

<button onClick={() => toggle("newToggle")}>{isOn ? "ON" : "OFF"}</button>;
```

---

## Migration dari Store Lama

### Before (4 files terpisah)

```typescript
// useAccountModalStore.ts
const { openAddModal } = useAccountModalStore();

// useTransactionModalStore.ts
const { openAddModal } = useTransactionModalStore();

// useBalanceVisibilityStore.ts
const { showBalances, toggleShowBalances } = useBalanceVisibilityStore();

// Manual device detection
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);
```

### After (Centralized stores)

```typescript
// useModalStore.ts - All modals in one place
const { openModal } = useModalStore();
openModal("account");
openModal("transaction");

// useToggleStore.ts - All toggles with persistence
const showBalances = useToggleStore((state) =>
  state.isActive("balanceVisibility")
);
const { toggle } = useToggleStore();
toggle("balanceVisibility");

// useDeviceStore.ts - Reactive device detection
const { isMobile, isTablet, isDesktop } = useDeviceStore();
// Auto-updates on window resize!
```

---

## Real-World Examples from App

### FloatingButton Component

```typescript
// Before: CSS class-based hiding + manual checks
<button className="lg:hidden fixed ...">

// After: Smart device detection
import { useDeviceStore } from "@/store/useDeviceStore";

const isMobile = useDeviceStore((state) => state.isMobile);
if (!showFab || !isMobile) return null;

<button className="fixed ..."> // No more lg:hidden needed!
```

### AccountPage Component

```typescript
// Before: Multiple store imports
import { useAccountModalStore } from "@/store/useAccountModalStore";
import { useBalanceVisibilityStore } from "@/store/useBalanceVisibilityStore";

const { isAddModalOpen, closeAddModal } = useAccountModalStore();
const { showBalances } = useBalanceVisibilityStore();

// After: Unified approach
import { useModalStore } from "@/store/useModalStore";
import { useToggleStore } from "@/store/useToggleStore";

const { isOpen, closeModal } = useModalStore();
const showBalances = useToggleStore((state) =>
  state.isActive("balanceVisibility")
);
```

---

## Benefits

✅ **DRY** - Tidak perlu buat file baru untuk setiap modal/toggle  
✅ **Type-safe** - TypeScript memastikan hanya modal/toggle yang valid  
✅ **Konsisten** - Semua modal menggunakan pattern yang sama  
✅ **Scalable** - Mudah menambah modal/toggle baru  
✅ **Maintainable** - Satu tempat untuk manage semua modal/toggle  
✅ **Smaller Bundle** - Lebih sedikit kode yang di-bundle  
✅ **Persisted** - Toggle state tersimpan di localStorage  
✅ **Reactive** - Device detection auto-update on window resize  
✅ **SSR Safe** - Semua store aman untuk server-side rendering

---

## Quick Reference

### All Available Stores

```typescript
// 1. Modal Management
import { useModalStore } from "@/store/useModalStore";
const { openModal, closeModal, isOpen, getData } = useModalStore();

// 2. Toggle Management (with persistence)
import { useToggleStore } from "@/store/useToggleStore";
const { toggle, setToggle, isActive } = useToggleStore();

// 3. Loading State
import { useLoadingStore } from "@/store/useLoadingStore";
const { isLoading, startLoading, stopLoading } = useLoadingStore();

// 4. Device Detection (auto-reactive)
import { useDeviceStore } from "@/store/useDeviceStore";
const { isMobile, isTablet, isDesktop, width } = useDeviceStore();
```

### Common Patterns

```typescript
// Open modal with data
openModal("editAccount", { account: selectedAccount });

// Toggle visibility
toggle("balanceVisibility");

// Check device type
const isMobile = useDeviceStore((state) => state.isMobile);

// Loading wrapper
const loadData = async () => {
  startLoading();
  try {
    await fetchData();
  } finally {
    stopLoading();
  }
};
```

### Available Modal Types

`account` | `transaction` | `deleteAccount` | `deleteTransaction` | `editAccount` | `editTransaction`

### Available Toggle Keys

`balanceVisibility` | `darkMode` | `sidebarCollapsed`

### Device Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px
