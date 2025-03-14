import React, { useContext, useEffect, useState } from 'react';
import { Plus, Edit, Trash, X, Star, Upload } from 'lucide-react';
import { formatPrice } from '../../../utils/format';
import ServiceContext from '../../../context/service/serviceContext';
import UserContext from '../../../context/auth/userContext';
import { openDialog } from 'uploadcare-widget';

export function ServicesPage() {
  const { AddServices, services, deleteService, editService, ShowAllServices } = useContext(ServiceContext)
  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    provider: '',
    price: Number,
    category: '',
    availability: true,
    image: '',
  });

  const [editformData, setEditFormData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    ShowAllServices()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    AddServices(formData)
    setFormData({
      availability: true
    })
    setShowAddForm(false);
  }

  const handleImageUpload = () => {
    openDialog({}, {
      publicKey: 'ff51bb6991fd3e18caf0',
      imagesOnly: true
    }).done((file) => {
      file.promise().then((fileInfo) => {
        setFormData({ ...formData, image: fileInfo.cdnUrl });
      });
    });
  };

  const handleEditImageUpload = () => {
    openDialog({}, {
      publicKey: 'ff51bb6991fd3e18caf0',
      imagesOnly: true
    }).done((file) => {
      file.promise().then((fileInfo) => {
        setEditFormData({ ...editformData, image: fileInfo.cdnUrl });
      });
    });
  };

  const handleEditClick = (serviceId) => {
    editService(serviceId, editformData)
    setEditFormData({})
    setShowEditForm(false);
  }

  const editServiceData = (service) => {
    setEditFormData({
      id: service._id,
      title: service.title,
      description: service.description,
      provider: service.provider,
      price: service.price,
      category: service.category,
      availability: service.availability,
      image: service.image,
    })
  }

  const filteredServices = services.filter(service => service.provider._id == user.id)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <div key={service._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={`${service.image}`}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{service.rating || 4.8}</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
                  <span className="text-gray-600">/visit</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{service.bookings || 11}</div>
                  <div className="text-sm text-gray-600">bookings</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowEditForm(true)
                    editServiceData(service)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Edit className="w-5 h-5" />
                  Edit
                </button>
                <button
                  onClick={() => deleteService(service._id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  <Trash className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl flex items-center justify-between  font-bold mb-4">Add New Service <X className='cursor-pointer text-gray-500' size={20} onClick={() => setShowAddForm(false)} /></h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name='title'
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name='description'
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (per visit)
                  </label>
                  <input
                    name='price'
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    type="number"
                    className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>

                  {formData.image ? (
                    <div
                      onClick={handleImageUpload}
                      className="w-30 h-9 p-3 overflow-hidden rounded-lg text-sm bg-white flex items-center justify-center cursor-pointer border hover:bg-gray-50 transition-colors"
                    >
                      {formData.image ? formData.image.split('/').filter(Boolean).pop() : "No image selected"}
                    </div>
                  ) : (<div
                    onClick={handleImageUpload}
                    className="w-30 h-9 rounded-lg bg-white flex items-center justify-center cursor-pointer border hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-gray-500" />
                  </div>)}


                  <input
                    type="file"
                    name='image'
                    hidden
                    onChange={handleImageUpload}
                    className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name='category'
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value=''>select category</option>
                  <option value='Cleaning'> Cleaning</option>
                  <option value='Plumbing'> Plumbing</option>
                  <option value='Electrical'> Electrical</option>
                  <option value='Moving'> Moving</option>
                  <option value='Painting'> Painting</option>
                  <option value='Carpentry'> Carpentry</option>
                  <option value='Beauty & Wellness'> Beauty & Wellness</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Service
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div >
      )
      }

      {
        showEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl flex items-center justify-between  font-bold mb-4">Edit Service <X className='cursor-pointer text-gray-500' size={20} onClick={() => setShowEditForm(false)} /></h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name='title'
                    required
                    value={editformData.title}
                    onChange={(e) => setEditFormData({ ...editformData, title: e.target.value })}
                    className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name='description'
                    required
                    value={editformData.description}
                    onChange={(e) => setEditFormData({ ...editformData, description: e.target.value })}
                    className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (per visit)
                    </label>
                    <input
                      name='price'
                      required
                      value={editformData.price}
                      onChange={(e) => setEditFormData({ ...editformData, price: Number(e.target.value) })}
                      type="number"
                      className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    {editformData.image ? (
                      <div
                        onClick={handleEditImageUpload}
                        className="w-30 h-9 p-3 overflow-hidden text-sm rounded-lg bg-white flex items-center justify-center cursor-pointer border hover:bg-gray-50 transition-colors"
                      >
                        {editformData.image ? editformData.image.split('/').filter(Boolean).pop() : "No image selected"}
                      </div>
                    ) : (<div
                      onClick={handleEditImageUpload}
                      className="w-30 h-9 rounded-lg bg-white flex items-center justify-center cursor-pointer border hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-gray-500" />
                    </div>)}


                    <input
                      type="file"
                      name='image'
                      hidden
                      onChange={handleEditImageUpload}
                      className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name='category'
                    required
                    value={editformData.category}
                    onChange={(e) => setEditFormData({ ...editformData, category: e.target.value })}
                    className="w-full px-2 py-1 rounded-lg border focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value=''>select category</option>
                    <option value='Cleaning'> Cleaning</option>
                    <option value='Plumbing'> Plumbing</option>
                    <option value='Electrical'> Electrical</option>
                    <option value='Moving'> Moving</option>
                    <option value='Painting'> Painting</option>
                    <option value='Carpentry'> Carpentry</option>
                    <option value='Beauty & Wellness'> Beauty & Wellness</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    onClick={() => handleEditClick(editformData.id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </div >
  );
}