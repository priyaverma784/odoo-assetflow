const mongoose = require('mongoose');

const ASSET_STATUS = ['Available', 'Allocated', 'Maintenance', 'Retired'];

const assetSchema = new mongoose.Schema(
  {
    assetId: { type: String, required: true, unique: true, trim: true },
    assetName: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'AssetCategory', required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    purchaseDate: { type: Date },
    purchaseCost: { type: Number, default: 0 },
    warranty: { type: Date }, // warranty expiry date
    vendor: { type: String, default: '' },
    serialNumber: { type: String, default: '', unique: true, sparse: true },
    qrCode: { type: String, default: '' }, // path to generated QR code image
    image: { type: String, default: '' },
    documents: [{ type: String }], // array of file paths
    status: { type: String, enum: ASSET_STATUS, default: 'Available' },
    location: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

assetSchema.index({ status: 1 });
assetSchema.index({ category: 1 });
assetSchema.index({ department: 1 });
assetSchema.index({ assetName: 'text', assetId: 'text', serialNumber: 'text', vendor: 'text' });

module.exports = mongoose.model('Asset', assetSchema);
module.exports.ASSET_STATUS = ASSET_STATUS;
