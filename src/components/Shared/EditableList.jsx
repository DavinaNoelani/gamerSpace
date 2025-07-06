import { useState } from "react";
import { useSelector } from "react-redux";

const EditableList = ({ items, onDelete, onEdit, type }) => {


    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('');


    if (!items || items.length === 0) {
        return <p>No {type.toLowerCase()}s found.</p>;
    }

    const filteredItems = items
        .filter((item) =>
            (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortType === 'priceLowHigh') {
                return a.price - b.price;
            } else if (sortType === 'priceHighLow') {
                return b.price - a.price;
            } else if (sortType === 'az') {
                const aName = (a.title || a.name).toLowerCase();
                const bName = (b.title || b.name).toLowerCase();
                return aName.localeCompare(bName);
            }
            return 0;
        });

    return (
        <>
            <div className="editable-list">
                <h3>{type} List</h3>

                <div className="filter-controls">
                    <input
                        type="text"
                        placeholder="Search by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input"
                    />

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="form-input"
                    >
                        <option value="">Sort By</option>
                        <option value="priceLowHigh">Price: Low to High</option>
                        <option value="priceHighLow">Price: High to Low</option>
                        <option value="az">Alphabetical (A-Z)</option>
                    </select>
                </div>

                {filteredItems.map((item) => (
                    <div key={item._id} className="editable-item">
                        <div><strong>{type === "Game" ? "Title" : "Name"}:</strong> {item.title || item.name}</div>
                        <div><strong>Price:</strong> ${item.price}</div>
                        <div><strong>Description:</strong> {item.description}</div>
                        {item.console && <div><strong>Console:</strong> {item.console}</div>}
                        {item.size && <div><strong>Size:</strong> {item.size}</div>}

                        <div className="button-group">
                            <button className="btn" onClick={() => onEdit(item)}>✏️ Edit</button>
                            <button className="btn" onClick={() => onDelete(item._id)}>🗑️ Delete</button>
                        </div>
                    </div>
                ))}

                {/* {items.map((item) => (
                    <div key={item._id} className="editable-item">
                        <div>
                            <strong>{type === "Game" ? "Title" : "Name"}:</strong>
                        </div>

                        <div>
                            <strong>Price:</strong> ${item.price}
                        </div>

                        <div>
                            <strong>Description:</strong> {item.description}
                        </div>

                        {item.console && (
                            <div>
                                <strong>Console:</strong> {item.console}
                            </div>
                        )}

                        {item.size && (
                            <div>
                                <strong>Size:</strong> {item.size}
                            </div>
                        )}

                        <div className="button-group">
                            <button className="btn" onClick={() => onEdit(item)}>✏️ Edit</button>
                            <button className="btn" onClick={() => onDelete(item._id)}>🗑️ Delete</button>
                        </div>
                    </div>
                ))} */}
            </div>
        </>
    );
}

export default EditableList